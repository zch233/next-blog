import {NextApiHandler} from 'next';
import {Post} from '../../../../src/entity/Post';
import {getDatabaseConnection} from '../../../../lib/getDatabaseConnection';

const Views: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'POST') {
    const {postId} = req.body;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', {id: postId}) as  Post
    post.views += 1
    await connection.manager.save(post);
    res.statusCode = 200;
    res.write(JSON.stringify(post));
  }
  res.end();
};

export default Views;