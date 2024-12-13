import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
