import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @ApiProperty({
        description: 'O email do usuário',
        example: 'larissa@example.com',
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'A senha do usuário',
        example: '123456',
    })
    password: string;

    @IsString()
    @ApiProperty({
        description: 'O nome do usuário',
        example: 'Larissa Roque',
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Imagem de perfil do usuário (opcional)',
        example: 'https://pt.pngtree.com/freepng/british-shorthair-cat-head-profile_5790491.html',
    })
    profile_img?: string;

    @IsOptional()
    @IsBoolean()
    is_superuser?: boolean;
}
