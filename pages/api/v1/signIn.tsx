import {NextApiHandler} from 'next';
import {SignIn} from '../../../src/model/SignIn';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';

const Login: NextApiHandler = async (req, res) => {
  const {username = '', password = ''} = req.body;
  const connection = await getDatabaseConnection();
  const signIn = new SignIn();
  signIn.username = username.trim();
  signIn.password = password;
  await signIn.validate(connection);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (signIn.hasError()) {
    res.statusCode = 422;
    res.write(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    res.write(JSON.stringify(signIn.user));
  }
  res.end();
};

export default Login;