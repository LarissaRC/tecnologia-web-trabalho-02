import { Controller, Patch, Param, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { LikedSongService } from './liked-song.service';

@Controller('liked-song')
export class LikedSongController {
  constructor(private readonly likedSongService: LikedSongService) {}

  @Patch(':userId/like/:songId')
  @HttpCode(HttpStatus.OK)
  async likeSong(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.likedSongService.likeSong(+userId, +songId);
  }

  @Patch(':userId/unlike/:songId')
  @HttpCode(HttpStatus.OK)
  async unlikeSong(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.likedSongService.unlikeSong(+userId, +songId);
  }

  @Get(':userId')
  async getLikedSongsByUser(@Param('userId') userId: string) {
    return this.likedSongService.getLikedSongsByUser(+userId);
  }

  @Get('count/:songId')
  async getSongLikeCount(@Param('songId') songId: string) {
    return this.likedSongService.getSongLikeCount(+songId);
  }
}
