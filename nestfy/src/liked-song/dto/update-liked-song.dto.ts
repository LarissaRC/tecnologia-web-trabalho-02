import { PartialType } from '@nestjs/mapped-types';
import { CreateLikedSongDto } from './create-liked-song.dto';

export class UpdateLikedSongDto extends PartialType(CreateLikedSongDto) {}
