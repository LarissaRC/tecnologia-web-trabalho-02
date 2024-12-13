import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
