import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { Song } from '../../song/entities/song.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  artist: Artist;

  @Column({ type: 'date' })
  release_date: Date;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
