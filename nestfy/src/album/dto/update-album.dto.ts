import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsString, IsOptional, IsDate, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    @IsString()
    @ApiProperty({
        description: 'Título da álbum',
        example: 'The very best',
    })
    title?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'Artista a quem pertence o álbum',
        example: 1,
    })
    artistId?: number;

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        description: 'Data de lançamento do álbum',
        example: "2022-02-05",
    })
    release_date?: Date;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    @ApiProperty({
        description: 'Gêneros do álbum',
        example: [1, 2, 3],
    })
    genreIds?: number[];
}
