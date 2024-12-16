import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}
  
  async create(createGenreDto: CreateGenreDto) {
    try {
      const genre = this.genreRepository.create(createGenreDto);
      return await this.genreRepository.save(genre);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Genre title already exists');
      }
      throw new InternalServerErrorException('Failed to create genre');
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve genres');
    }
  }

  async findOne(id: number) {
    try {
      const genre = await this.genreRepository.findOne({ where: { id } });
      if (!genre) {
        throw new NotFoundException(`Genre with ID ${id} not found`);
      }
      return genre;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve genre');
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      const genre = await this.findOne(id);

      if (updateGenreDto.title) {
        const existingGenre = await this.genreRepository.findOne({
          where: { title: updateGenreDto.title, id: Not(id) },
        });
        if (existingGenre) {
          throw new BadRequestException('Genre title already exists');
        }
      }

      const updatedGenre = { ...genre, ...updateGenreDto };
      return await this.genreRepository.save(updatedGenre);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update genre');
    }
  }

  async remove(id: number) {
    try {
      const genre = await this.findOne(id);
      await this.genreRepository.remove(genre);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete genre');
    }
  }
}
