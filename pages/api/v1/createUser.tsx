import {NextApiHandler} from 'next';
import {User} from '../../../src/entity/User';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';

interface Errors {
  username: string[],
  password: string[],
  passwordConfirmation: string[],
}

const Posts: NextApiHandler = async (req, res) => {
  const {username = '', password = '', passwordConfirmation = ''} = req.body;
  const errors: Errors = {
    username: [],
    password: [],
    passwordConfirmation: [],
  };
  if (username.trim() === '') {
    errors.username.push('用户名不能为空');
  }
  if (username.trim().length < 6) {
    errors.username.push('用户名太短');
  }
  if (username.trim().length > 42) {
    errors.username.push('用户名太长');
  }
  if (!/[A-Za-z0-9]/.test(username)) {
    errors.username.push('用户名只能是字母和数字');
  }
  if (password === '') {
    errors.password.push('密码不能为空');
  }
  if (password.length < 6) {
    errors.password.push('密码太短');
  }
  if (passwordConfirmation === '') {
    errors.passwordConfirmation.push('确认密码不能为空');
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('两次密码不一致');
  }
  const connection = await getDatabaseConnection();
  const hasUser = await connection.manager.find(User, {username});
  if (hasUser.length > 0) {
    errors.username.push('用户名已存在')
  }
  res.setHeader('Content-Type', 'application/json');
  if (Object.values(errors).find(v => v.length > 0)) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    res.statusCode = 200;
    const user = new User();
    user.username = username;
    user.password = password;
    await connection.manager.save(user)
    res.write(JSON.stringify({mas: '成功'}));
  }
  res.end();
};

export default Posts;