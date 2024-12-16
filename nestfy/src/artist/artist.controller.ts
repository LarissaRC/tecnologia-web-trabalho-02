import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo artista' })
  @ApiResponse({ status: 201, description: 'Artista criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém detalhes de todos os artistas' })
  @ApiResponse({ status: 200, description: 'Detalhes dos artistas retornados.' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de um artista' })
  @ApiParam({ name: 'id', description: 'ID do artista', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do artista retornados.' })
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um artista' })
  @ApiParam({ name: 'id', description: 'ID do artista', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do artista atualizados.' })
  @ApiResponse({ status: 404, description: 'Artista não encontrado.' })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de um artista' })
  @ApiParam({ name: 'id', description: 'ID do artista', type: String })
  @ApiResponse({ status: 200, description: 'Artista excluído.' })
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}
