import {
  Column,
  Connection,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  async validate (connection: Connection, update?:boolean) {
    if (!this.name) {
      this.errors.name.push('名称不能为空');
    }
    if (!update) {
      const hasCategory = await connection.manager.findOne(Category, {name: this.name});
      if (hasCategory) {
        this.errors.name.push('该标签已存在');
      }
    }
  };
  hasError () {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }
  toJSON () {
    return {id: this.id, name: this.name, createdAt: this.createdAt, updatedAt: this.updatedAt}
  }
}
