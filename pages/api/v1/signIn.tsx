import {NextApiHandler} from 'next';
import {SignIn} from '../../../src/model/SignIn';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSesstion';

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
    // @ts-ignore
    req.session.set('user', signIn.user)
    // @ts-ignore
    await req.session.save()
    res.statusCode = 200;
    res.write(JSON.stringify(signIn.user));
  }
  res.end();
};

export default withSession(Login);