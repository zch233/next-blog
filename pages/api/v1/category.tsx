import {NextApiHandler} from 'next';
import {Category} from '../../../src/entity/Category';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSesstion';

const Categories: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const user = req.session.get('user');
  if (!user) {
    res.statusCode = 401;
    res.write(JSON.stringify({msg: '请登录'}));
    res.end();
    return;
  }
  const connection = await getDatabaseConnection();
  if (req.method === 'POST') {
    const category = new Category();
    category.name = req.body.name.trim();
    await category.validate(connection)
    if (category.hasError()) {
      res.statusCode = 422;
      res.write(JSON.stringify(category.errors));
      res.end();
      return;
    }
    await connection.manager.save(category);
    res.statusCode = 200;
    res.write(JSON.stringify(category));
  } else if (req.method === 'GET') {
    const categories = await connection.manager.find('Category', {
      order: {
        createdAt: 'DESC',
      },
    });
    res.statusCode = 200;
    res.write(JSON.stringify(categories));
  }
  res.end();
};

export default withSession(Categories);