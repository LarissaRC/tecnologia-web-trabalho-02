import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}
  
  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const { title, artistId, release_date, genreIds } = createAlbumDto;

      const album = this.albumRepository.create({ title, release_date });

      if (artistId) {
        const artist = await this.artistRepository.findOne({
          where: { id: artistId },
        });
        if (!artist) {
          throw new NotFoundException(`Artist with ID ${artistId} not found`);
        }
        album.artist = artist;
      }

      if (genreIds && genreIds.length > 0) {
        const genres = await this.genreRepository.findByIds(genreIds);
        album.genres = genres;
      }

      return await this.albumRepository.save(album);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create album');
    }
  }

  async findAll() {
    try {
      return await this.albumRepository.find({
        relations: ['artist', 'genres', 'songs'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve albums');
    }
  }

  async findOne(id: number) {
    try {
      const album = await this.albumRepository.findOne({
        where: { id },
        relations: ['artist', 'genres', 'songs'],
      });
      if (!album) {
        throw new NotFoundException(`Album with ID ${id} not found`);
      }
      return album;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve album');
    }
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.findOne(id);

      const { artistId, genreIds } = updateAlbumDto;

      if (artistId) {
        const artist = await this.artistRepository.findOne({
          where: { id: artistId },
        });
        if (!artist) {
          throw new NotFoundException(`Artist with ID ${artistId} not found`);
        }
        album.artist = artist;
      }

      if (genreIds) {
        const genres = await this.genreRepository.findByIds(genreIds);
        album.genres = genres;
      }

      Object.assign(album, updateAlbumDto);

      return await this.albumRepository.save(album);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update album');
    }
  }

  async remove(id: number) {
    try {
      const album = await this.findOne(id);
      await this.albumRepository.remove(album);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete album');
    }
  }
}
