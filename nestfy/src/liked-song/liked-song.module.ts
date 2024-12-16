import { Module } from '@nestjs/common';
import { LikedSongService } from './liked-song.service';
import { LikedSongController } from './liked-song.controller';
import { LikedSong } from './entities/liked-song.entity';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/song/entities/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LikedSong, User, Song])],
  controllers: [LikedSongController],
  providers: [LikedSongService],
})
export class LikedSongModule {}
