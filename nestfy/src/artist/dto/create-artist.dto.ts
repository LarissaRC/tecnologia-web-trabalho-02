import { IsString, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
