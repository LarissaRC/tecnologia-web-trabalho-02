import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O título do gênero',
    example: 'POP',
  })
  title: string;
}
