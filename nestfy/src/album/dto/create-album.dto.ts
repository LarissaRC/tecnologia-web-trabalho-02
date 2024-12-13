import { IsString, IsOptional, IsDate, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  artistId?: number;

  @Type(() => Date)
  @IsDate()
  release_date: Date;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds?: number[];
}
