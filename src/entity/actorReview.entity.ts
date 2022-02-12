import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Movie } from "./movie.entity";
  
  @Entity()
  export class ActorReviev {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    review: string
    @Column()
    actorId: number
    @Column()
    commenterName: string
    @Column()
    commenterId: number

    
  }
  