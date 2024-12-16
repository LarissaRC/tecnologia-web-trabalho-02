import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo álbum' })
  @ApiResponse({ status: 201, description: 'Álbum criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':artistId')
  @ApiOperation({ summary: 'Obtém todos os álbuns de um artista' })
  @ApiParam({ name: 'artistId', description: 'ID do artista', type: String })
  @ApiResponse({ status: 200, description: 'Álbuns do artista retornados.' })
  findAllByArtist(@Param('artistId') artistId: string) {
    return this.albumService.findAllByArtist(+artistId);
  }

  @Get(':id/songs')
  @ApiOperation({ summary: 'Obtém todas as músicas de um álbum' })
  @ApiParam({ name: 'id', description: 'ID do álbum', type: String })
  @ApiResponse({ status: 200, description: 'Músicas do álbum retornados.' })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um álbum' })
  @ApiParam({ name: 'id', description: 'ID do álbum', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do álbum atualizados.' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de um álbum' })
  @ApiParam({ name: 'id', description: 'ID do álbum', type: String })
  @ApiResponse({ status: 200, description: 'Álbum excluído.' })
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
