import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  name: string;
  @OneToMany('Post', 'category')
  posts: Post[];
}
