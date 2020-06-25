import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  content: string;
  @Column('int')
  userId: number;
  @Column('int')
  postId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(type => User, user => user.comments)
  user: User;
  @ManyToOne(type => Post, post => post.comments)
  post: Post
}
