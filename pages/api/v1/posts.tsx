import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSesstion';

const Posts: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    // @ts-ignore
    const user = req.session.get('user');
    if (!user) {
      res.statusCode = 401;
      res.write(JSON.stringify({msg: '请登录'}));
      res.end();
      return;
    }
    post.author = user;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.statusCode = 200;
    res.write(JSON.stringify(post));
  } else if (req.method === 'GET') {
    const posts = await getPosts();
    res.statusCode = 200;
    res.write(JSON.stringify(posts));
  }
  res.end();
};

export default withSession(Posts);