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
    @Column({ unique: true })
    moviePhotoUrl: string;
    @Column()
    show: number;
    @Column()
    owner_id: number
  
  }
  