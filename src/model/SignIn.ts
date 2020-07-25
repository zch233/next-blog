import {Connection} from 'typeorm';
import {User} from '../entity/User';

export class SignIn {
  username: string;
  password: string;
  user: User;

  errors: { username: string[], password: string[] } = {username: [], password: []};
  async validate (connection: Connection) {
    if (this.username === '') {
      this.errors.username.push('用户名不能为空');
    }
    const user = await connection.manager.findOne(User, {username: this.username});
    if (user) {
      if (user.passwordDigest !== this.password) {
        this.errors.password.push('密码不匹配');
      } else {
        this.user = user;
      }
    } else {
      this.errors.username.push('用户名不存在');
    }
  }
  hasError () {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }
}
