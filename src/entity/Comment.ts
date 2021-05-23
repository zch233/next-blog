import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
  @ManyToOne('User', 'comments')
  user: User;
  @ManyToOne('Post', 'comments')
  post: Post
}
