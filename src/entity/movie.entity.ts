import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  movie_name: string;
  @Column()
  ownerId: number
  @Column()
  ownerName: string
  @Column('boolean', {default: false})
  share : boolean
  
}
