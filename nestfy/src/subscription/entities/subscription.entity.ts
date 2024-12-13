import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'gratuito' })
  type: string;

  @Column({ type: 'date' })
  begin_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;
}
