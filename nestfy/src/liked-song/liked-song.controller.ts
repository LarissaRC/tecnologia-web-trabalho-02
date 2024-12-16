import { Controller, Patch, Param, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LikedSongService } from './liked-song.service';

@ApiTags('Liked Songs')
@Controller('liked-song')
export class LikedSongController {
  constructor(private readonly likedSongService: LikedSongService) {}

  @Patch(':userId/like/:songId')
  @ApiOperation({ summary: 'Registra uma música curtida para um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiParam({ name: 'songId', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Música curtida.' })
  async likeSong(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.likedSongService.likeSong(+userId, +songId);
  }

  @Patch(':userId/unlike/:songId')
  @ApiOperation({ summary: 'Remove uma música curtida para um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiParam({ name: 'songId', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Curtida removida.' })
  async unlikeSong(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.likedSongService.unlikeSong(+userId, +songId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Retorna todas as músicas curtidas de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiResponse({ status: 200, description: 'Músicas curtidas retornadas.' })
  async getLikedSongsByUser(@Param('userId') userId: string) {
    return this.likedSongService.getLikedSongsByUser(+userId);
  }

  @Get('count/:songId')
  @ApiOperation({ summary: 'Retorna o total de likes de uma música.' })
  @ApiParam({ name: 'songId', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Total de likes retornado.' })
  async getSongLikeCount(@Param('songId') songId: string) {
    return this.likedSongService.getSongLikeCount(+songId);
  }
}
