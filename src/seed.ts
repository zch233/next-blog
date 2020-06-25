import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";

createConnection().then(async connection => {
  const posts = await connection.manager.find(Post)
  console.log(posts)
  await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => new Post({
    title: `第${n}篇博客`,
    content: `这是第${n}篇博客的内容`
  })))
  console.log('数据填充了')
  await connection.close()

}).catch(error => console.log(error));
