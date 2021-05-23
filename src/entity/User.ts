import {
  BeforeInsert,
  Column, Connection,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface Errors {
  username: string[],
  password: string[],
  passwordConfirmation: string[],
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
  @OneToMany('Post', 'author')
  posts: Post[];
  @OneToMany('Comment', 'user')
  comments: Comment[];

  password: string;
  passwordConfirmation: string;
  errors: Errors = {
    username: [],
    password: [],
    passwordConfirmation: [],
  };
  async validate (connection: Connection) {
    if (this.username === '') {
      this.errors.username.push('用户名不能为空');
    }
    if (this.username.length < 6) {
      this.errors.username.push('用户名太短');
    }
    if (this.username.length > 42) {
      this.errors.username.push('用户名太长');
    }
    if (!/[A-Za-z0-9]/.test(this.username)) {
      this.errors.username.push('用户名只能是字母和数字');
    }
    if (this.password === '') {
      this.errors.password.push('密码不能为空');
    }
    if (this.password.length < 6) {
      this.errors.password.push('密码太短');
    }
    if (this.passwordConfirmation === '') {
      this.errors.passwordConfirmation.push('确认密码不能为空');
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('两次密码不一致');
    }
    const hasUser = await connection.manager.findOne(User, {username: this.username});
    if (hasUser) {
      this.errors.username.push('用户名已存在');
    }
  };
  hasError () {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }

  toJSON () {
    return { id: this.id, username: this.username, createdAt: this.createdAt, updatedAt: this.updatedAt }
  }


  @BeforeInsert()
  generatePasswordDigest () {
    this.passwordDigest = this.password;
  }
}
