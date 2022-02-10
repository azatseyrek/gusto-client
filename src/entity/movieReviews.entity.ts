import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

  
  @Entity()
  export class MovieReviews {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    comment: string;
    @Column()
    owner_id?: number
    @Column()
    commenterId: number
  }
  
