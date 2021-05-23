import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface Errors {
  title: string[],
  content: string[],
  category: string[],
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('text')
  content: string;
  @Column('text')
  images: string;
  @Column('int')
  views: number;
  @Column('int')
  categoryId: number | string;
  @Column('int')
  authorId: number;
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
  @ManyToOne('User', 'posts')
  author: User;
  @ManyToOne('Category', 'posts')
  category: Category;
  @OneToMany('Comment', 'post')
  comments: Comment[];

  errors: Errors = {
    title: [],
    content: [],
    category: [],
  };
  async validate () {
    if (!this.title) {
      this.errors.title.push('标题不能为空');
    }
    if (!this.content) {
      this.errors.content.push('内容不能为空');
    }
    if (!this.categoryId) {
      this.errors.category.push('分类不能为空');
    }
  };
  hasError () {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }
  toJSON () {
    return {id: this.id, title: this.title, content: this.content, images: this.images, views: this.views, category: this.category, createdAt: this.createdAt, updatedAt: this.updatedAt, author: this.author}
  }
}
