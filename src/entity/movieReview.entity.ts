import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Movie } from "./movie.entity";
  
  @Entity()
  export class MovieReviev {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    review: string
    @Column()
    movieId: number
    @Column()
    commenterName: string
    @Column()
    commenterId: number

    // @ManyToOne(()=> Movie, movie => movie.moviereviews)
    // @JoinColumn()
    // movie: Movie
  
    
  }
  