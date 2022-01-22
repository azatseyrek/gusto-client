import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
