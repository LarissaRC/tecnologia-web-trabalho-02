import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikedSong } from './entities/liked-song.entity';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/song/entities/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikedSongService {
  constructor(
    @InjectRepository(LikedSong)
    private readonly likedSongRepository: Repository<LikedSong>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async likeSong(userId: number, songId: number): Promise<LikedSong> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const song = await this.songRepository.findOne({ where: { id: songId } });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      if (!song) {
        throw new NotFoundException(`Song with ID ${songId} not found`);
      }

      const existingLike = await this.likedSongRepository.findOne({
        where: { user: { id: userId }, song: { id: songId } },
      });

      if (existingLike) {
        throw new BadRequestException('Song is already liked by this user');
      }

      const likedSong = this.likedSongRepository.create({ user, song });
      return await this.likedSongRepository.save(likedSong);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to like the song');
    }
  }

  async unlikeSong(userId: number, songId: number): Promise<void> {
    try {
      const likedSong = await this.likedSongRepository.findOne({
        where: { user: { id: userId }, song: { id: songId } },
      });

      if (!likedSong) {
        throw new NotFoundException(`Liked song not found for user ${userId} and song ${songId}`);
      }

      await this.likedSongRepository.remove(likedSong);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to unlike the song');
    }
  }
  
  async getLikedSongsByUser(userId: number): Promise<Song[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const likedSongs = await this.likedSongRepository.find({
      where: { user: { id: userId } },
      relations: ['song'],
    });

    return likedSongs.map((likedSong) => likedSong.song);
  }

  async getSongLikeCount(songId: number): Promise<{ songId: number; likeCount: number }> {
    const song = await this.songRepository.findOne({ where: { id: songId } });

    if (!song) {
      throw new NotFoundException(`Song with ID ${songId} not found`);
    }

    const likeCount = await this.likedSongRepository.count({
      where: { song: { id: songId } },
    });

    return { songId, likeCount };
  }
}
