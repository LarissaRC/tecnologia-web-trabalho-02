import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@ApiTags('Songs')
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova música' })
  @ApiResponse({ status: 201, description: 'Música criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as músicas' })
  @ApiResponse({ status: 201, description: 'Músicas retornadas com sucesso.' })
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de uma música' })
  @ApiParam({ name: 'id', description: 'ID da música', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes da música retornados.' })
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cria uma nova música' })
  @ApiParam({ name: 'id', description: 'ID da música', type: String })
  @ApiResponse({ status: 201, description: 'Música atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma música' })
  @ApiParam({ name: 'id', description: 'ID da música', type: String })
  @ApiResponse({ status: 201, description: 'Música deletada.' })
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}
