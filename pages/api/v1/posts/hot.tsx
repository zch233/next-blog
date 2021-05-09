import {NextApiHandler} from 'next';
import {Post} from '../../../../src/entity/Post';
import {getDatabaseConnection} from '../../../../lib/getDatabaseConnection';
import { MoreThan } from 'typeorm';

const Hot: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    const connection = await getDatabaseConnection();
    const size = parseInt((req.query.size || 10).toString());
    const posts = await connection.manager.find('Post', {
      take: size,
      order: {views: 'DESC'},
      where: {views: MoreThan(0)},
      join: {
        alias: 'post',
        leftJoinAndSelect: {
          author: 'post.author',
        },
      },
    })
    res.statusCode = 200;
    res.write(JSON.stringify(posts));
  }
  res.end();
};

export default Hot;