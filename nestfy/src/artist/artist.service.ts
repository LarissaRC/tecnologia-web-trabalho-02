import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      const artist = this.artistRepository.create(createArtistDto);
      return await this.artistRepository.save(artist);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create artist');
    }
  }

  async findAll() {
    try {
      return await this.artistRepository.find({ relations: ['albums'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve artists');
    }
  }

  async findOne(id: number) {
    try {
      const artist = await this.artistRepository.findOne({
        where: { id },
        relations: ['albums'],
      });
      if (!artist) {
        throw new NotFoundException(`Artist with ID ${id} not found`);
      }
      return artist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve artist');
    }
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.findOne(id);
      const updatedArtist = { ...artist, ...updateArtistDto };
      return await this.artistRepository.save(updatedArtist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update artist');
    }
  }

  async remove(id: number) {
    try {
      const artist = await this.findOne(id);
      await this.artistRepository.remove(artist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete artist');
    }
  }
}
