import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O título do gênero',
    example: 'POP',
  })
  title: string;
}
