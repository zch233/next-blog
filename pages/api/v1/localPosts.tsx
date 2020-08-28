import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';

const Posts: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    const posts = await getPosts();
    res.statusCode = 200;
    res.write(JSON.stringify(posts));
  }
  res.end();
};

export default Posts;