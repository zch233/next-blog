import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSesstion';
import marked from 'marked'

const Posts: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    // @ts-ignore
    post.images = content && JSON.stringify(marked.lexer(content).filter(v => v.type === 'paragraph').reduce((a, b) => a.concat(b.tokens), []).filter(v => v.type === 'image').map(v => v.href))
    post.title = title.trim();
    post.content = content.trim();
    await post.validate()
    const user = req.session.get('user');
    if (!user) {
      res.statusCode = 401;
      res.write(JSON.stringify({msg: '请登录'}));
      res.end();
      return;
    }
    if (post.hasError()) {
      res.statusCode = 422;
      res.write(JSON.stringify(post.errors));
      res.end();
      return;
    }
    post.author = user;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.statusCode = 200;
    res.write(JSON.stringify(post));
  } else if (req.method === 'GET') {
    const connection = await getDatabaseConnection();
    const size = parseInt((req.query.size || 10).toString());
    const page = parseInt((req.query.page || 1).toString());
    const [posts, total] = await connection.manager.findAndCount('Post', {
      take: size,
      skip: (page - 1) * size,
      join: {
        alias: 'post',
        leftJoinAndSelect: {
          author: 'post.author',
        },
      },
    });
    res.statusCode = 200;
    res.write(JSON.stringify({ posts, total, page, size }));
  }
  res.end();
};

export default withSession(Posts);