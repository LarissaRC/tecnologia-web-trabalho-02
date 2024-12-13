import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/song/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User, Song])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
