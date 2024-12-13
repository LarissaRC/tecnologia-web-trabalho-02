import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Song } from '../../song/entities/song.entity';

@Entity()
export class LikedSong {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likedSongs)
  user: User;

  @ManyToOne(() => Song)
  song: Song;
}
