import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
//   import { User } from "./user.entity";
  
  @Entity()
  export class Actor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    actor_name: string;
    @Column({ unique: true })
    actorPhotoUrl: string;
    @Column()
    owner_id: number
  }
  