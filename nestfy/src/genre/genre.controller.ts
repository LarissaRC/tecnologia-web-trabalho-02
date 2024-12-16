import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@ApiTags('Genres')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo gênero' })
  @ApiResponse({ status: 201, description: 'Gênero criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém detalhes de todos os gêneros' })
  @ApiResponse({ status: 200, description: 'Detalhes dos gêneros retornados.' })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de um gênero' })
  @ApiParam({ name: 'id', description: 'ID do gênero', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do gênero retornados.' })
  @ApiResponse({ status: 404, description: 'Gênero não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um gênero' })
  @ApiParam({ name: 'id', description: 'ID do gênero', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do gênero atualizados.' })
  @ApiResponse({ status: 404, description: 'Gênero não encontrado.' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de um gênero' })
  @ApiParam({ name: 'id', description: 'ID do gênero', type: String })
  @ApiResponse({ status: 200, description: 'Gênero excluído.' })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
