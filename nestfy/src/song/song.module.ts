import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Album])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
