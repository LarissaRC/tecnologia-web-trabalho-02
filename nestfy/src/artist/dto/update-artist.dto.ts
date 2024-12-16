import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @IsString()
    @ApiProperty({
        description: 'O nome do artista',
        example: 'Bruce o Artista',
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Imagem de perfil do artista (opcional)',
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fdog-front-view&psig=AOvVaw2IXwP60Oe_nHKrMZux3iHn&ust=1734463411193000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjfv-2BrYoDFQAAAAAdAAAAABAE',
    })
    profile_img?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'A biografia (resumo) do artista',
        example: 'Bruce é um famoso artista brasileiro, que nos encanta com suas batidas viciantes e letras originais.',
    })
    bio?: string;
}
