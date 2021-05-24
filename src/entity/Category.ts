import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

interface Errors {
  name: string[],
}

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  name: string;
  @OneToMany('Post', 'category')
  posts: Post[];
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  errors: Errors = {
    name: [],
  };
  async validate () {
    if (!this.name) {
      this.errors.name.push('名称不能为空');
    }
  };
  hasError () {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }
}
