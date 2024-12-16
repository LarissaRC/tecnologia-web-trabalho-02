import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsString()
  @ApiProperty({
      description: 'Título da música',
      example: 'Pretty song name',
  })
  title?: string;

  @IsNumber()
  @ApiProperty({
      description: 'Duração da música em segundos',
      example: 95,
  })
  duration?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
      description: 'Álbum a que pertence esta nova música',
      example: 1,
  })
  albumId?: number;
}
