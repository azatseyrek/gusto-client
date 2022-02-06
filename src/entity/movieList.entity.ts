import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from "./movie.entity";
import { User } from "./user.entity";



@Entity()
export class MovieList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:0})
    likeCount?: number 


    // @OneToMany(() => Movie, movie => movie.movielist)
    // @JoinColumn()
    // movies: Movie[];



}