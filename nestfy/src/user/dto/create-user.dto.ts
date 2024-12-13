import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    profile_img?: string;
  
    @IsOptional()
    @IsBoolean()
    is_superuser?: boolean;
}
