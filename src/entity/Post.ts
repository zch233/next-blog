import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Comment} from './Comment'
import {User} from "./User";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('text')
  content: string;
  @Column('int')
  authorId: number;
  @CreateDateColumn('timestamp')
  createdAt: Date;
  @UpdateDateColumn('timestamp')
  updatedAt: Date;
  @ManyToOne(type => User, user => user.posts)
  user: User;
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
