import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovieReviev } from "./movieReview.entity";

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
  @Column({default: 1})
  likeCount: number
  @Column({default: 0})
  likes: string

  // @OneToMany(()=> MovieReviev, moviereview => moviereview.review)
  // @JoinColumn()
  // moviereviews : MovieReviev[]

  
}


 // from movieList
   // @OneToMany(() => Movie, movie => movie.movielist)
    // @JoinColumn()
    // movies: Movie[];