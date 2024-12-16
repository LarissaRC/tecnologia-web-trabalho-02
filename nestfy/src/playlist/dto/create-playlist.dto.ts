import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty({
      description: 'Título da playlist',
      example: 'Músicas para festa',
  })
  title: string;

  @IsNumber()
  @ApiProperty({
      description: 'ID do usuário dono da playlist',
      example: 1,
  })
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
      description: 'IDs das músicas da playlist (não obrigatório)',
      example: [1, 2, 3],
  })
  songIds?: number[];
}
