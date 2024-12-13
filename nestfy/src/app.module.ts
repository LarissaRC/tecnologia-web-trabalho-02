import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SongModule } from './song/song.module';
import { PlaylistModule } from './playlist/playlist.module';
import { LikedSongModule } from './liked-song/liked-song.module';
import { GenreModule } from './genre/genre.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    TypeOrmModule,
    UserModule,
    SubscriptionModule,
    SongModule,
    PlaylistModule,
    LikedSongModule,
    GenreModule,
    ArtistModule,
    AlbumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
