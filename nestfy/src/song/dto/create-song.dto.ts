import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
  albumId?: number;
}
