import {NextApiHandler} from 'next';
import {User} from '../../../src/entity/User';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';

const Posts: NextApiHandler = async (req, res) => {
  const {username = '', password = '', passwordConfirmation = ''} = req.body;
  const connection = await getDatabaseConnection();
  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.passwordConfirmation = passwordConfirmation
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  await user.validate(connection)
  if (user.hasError()) {
    res.statusCode = 422;
    res.write(JSON.stringify(user.errors));
  } else {
    res.statusCode = 200;
    await connection.manager.save(user)
    res.write(JSON.stringify({mas: '成功'}));
  }
  res.end();
};

export default Posts;