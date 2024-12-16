import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Playlists')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova playlist' })
  @ApiResponse({ status: 201, description: 'Playlist criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Retorna todas as playlists de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiResponse({ status: 200, description: 'Playlists retornados.' })
  findAllByUser(@Param('userId') userId: string) {
    return this.playlistService.findAllByUser(+userId);
  }

  @Get(':id/songs')
  @ApiOperation({ summary: 'Obtém músicas de uma playlist' })
  @ApiParam({ name: 'id', description: 'ID da playlist', type: String })
  @ApiResponse({ status: 200, description: 'Músicas da playlist retornados.' })
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza playlist' })
  @ApiParam({ name: 'id', description: 'ID da playlist', type: String })
  @ApiResponse({ status: 201, description: 'Playlist atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de uma playlist' })
  @ApiParam({ name: 'id', description: 'ID da playlist', type: String })
  @ApiResponse({ status: 200, description: 'Playlist excluída.' })
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }

  @Patch(':id/add-song/:songId')
  @ApiOperation({ summary: 'Adiciona uma música a uma playlist' })
  @ApiParam({ name: 'id', description: 'ID da playlist', type: String })
  @ApiParam({ name: 'songId', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Música adicionada.' })
  async addSong(
    @Param('id') playlistId: string,
    @Param('songId') songId: string,
  ) {
    return this.playlistService.addSong(+playlistId, +songId);
  }

  @Patch(':id/remove-song/:songId')
  @ApiOperation({ summary: 'Remove uma música de uma playlist' })
  @ApiParam({ name: 'id', description: 'ID da playlist', type: String })
  @ApiParam({ name: 'songId', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Música removida.' })
  async removeSong(
    @Param('id') playlistId: string,
    @Param('songId') songId: string,
  ) {
    return this.playlistService.removeSong(+playlistId, +songId);
  }
}
