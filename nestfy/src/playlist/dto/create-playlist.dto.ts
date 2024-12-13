import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  title: string;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  songIds?: number[];
}
