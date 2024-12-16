import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Album } from 'src/album/entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  
  async create(createSongDto: CreateSongDto) {
    try {
      const { title, duration, albumId } = createSongDto;

      const song = this.songRepository.create({ title, duration });

      if (albumId) {
        const album = await this.albumRepository.findOne({
          where: { id: albumId },
        });
        if (!album) {
          throw new NotFoundException(`Album with ID ${albumId} not found`);
        }
        song.album = album;
      }

      return await this.songRepository.save(song);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create song');
    }
  }

  async findAll() {
    try {
      return await this.songRepository.find({ relations: ['album'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve songs');
    }
  }

  async findOne(id: number) {
    try {
      const song = await this.songRepository.findOne({
        where: { id },
        relations: ['album'],
      });
      if (!song) {
        throw new NotFoundException(`Song with ID ${id} not found`);
      }
      return song;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve song');
    }
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    try {
      const song = await this.findOne(id);

      const { albumId } = updateSongDto;

      if (albumId) {
        const album = await this.albumRepository.findOne({
          where: { id: albumId },
        });
        if (!album) {
          throw new NotFoundException(`Album with ID ${albumId} not found`);
        }
        song.album = album;
      }

      Object.assign(song, updateSongDto);

      return await this.songRepository.save(song);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update song');
    }
  }

  async remove(id: number) {
    try {
      const song = await this.findOne(id);
      await this.songRepository.remove(song);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete song');
    }
  }
}
