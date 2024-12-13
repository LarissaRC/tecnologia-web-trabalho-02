import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/song/entities/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}
  
  async create(createPlaylistDto: CreatePlaylistDto) {
    try {
      const { title, userId, songIds } = createPlaylistDto;

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const playlist = this.playlistRepository.create({ title, user });

      if (songIds) {
        const songs = await this.songRepository.findByIds(songIds);
        playlist.songs = songs;
      }

      return await this.playlistRepository.save(playlist);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create playlist');
    }
  }

  async findAll() {
    try {
      return await this.playlistRepository.find({ relations: ['user', 'songs'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve playlists');
    }
  }

  async findOne(id: number) {
    try {
      const playlist = await this.playlistRepository.findOne({
        where: { id },
        relations: ['user', 'songs'],
      });
      if (!playlist) {
        throw new NotFoundException(`Playlist with ID ${id} not found`);
      }
      return playlist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve playlist');
    }
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    try {
      const playlist = await this.findOne(id);

      const { songIds, userId, ...rest } = updatePlaylistDto;

      if (userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
        playlist.user = user;
      }

      if (songIds) {
        const songs = await this.songRepository.findByIds(songIds);
        playlist.songs = songs;
      }

      Object.assign(playlist, rest);

      return await this.playlistRepository.save(playlist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update playlist');
    }
  }

  async remove(id: number) {
    try {
      const playlist = await this.findOne(id);
      await this.playlistRepository.remove(playlist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete playlist');
    }
  }

  async addSong(playlistId: number, songId: number): Promise<Playlist> {
    try {
      const playlist = await this.findOne(playlistId);
      const song = await this.songRepository.findOne({ where: { id: songId } });
  
      if (!song) {
        throw new NotFoundException(`Song with ID ${songId} not found`);
      }
  
      if (playlist.songs.find((s) => s.id === songId)) {
        throw new BadRequestException(`Song with ID ${songId} is already in the playlist`);
      }
  
      playlist.songs.push(song);
      return await this.playlistRepository.save(playlist);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add song to playlist');
    }
  }
  
  async removeSong(playlistId: number, songId: number): Promise<Playlist> {
    try {
      const playlist = await this.findOne(playlistId);
  
      const songIndex = playlist.songs.findIndex((s) => s.id === songId);
  
      if (songIndex === -1) {
        throw new NotFoundException(`Song with ID ${songId} is not in the playlist`);
      }
  
      playlist.songs.splice(songIndex, 1);
      return await this.playlistRepository.save(playlist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove song from playlist');
    }
  }
}
