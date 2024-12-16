import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { LikedSong } from '../../liked-song/entities/liked-song.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column({ default: false })
  is_superuser: boolean;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => LikedSong, (likedSong) => likedSong.user)
  likedSongs: LikedSong[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
