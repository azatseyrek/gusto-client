import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { MovieList } from "./movieList.entity";



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column('boolean', {default: true})
  shareMovieList : boolean
  @Column('boolean', {default: false})
  shareActorList : boolean
  

  // from movieList
   // @OneToMany(() => Movie, movie => movie.movielist)
    // @JoinColumn()
    // movies: Movie[];
 

  

}
