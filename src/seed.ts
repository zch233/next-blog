import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {User} from "./entity/User";
import {Comment} from "./entity/Comment";

createConnection().then(async connection => {
  const user = new User()
  user.username = '第一个用户'
  user.password = '123456'
  await connection.manager.save(user)
  const post = new Post()
  post.title = '一篇博客'
  post.content = '这是第这篇博客的内容'
  post.author = user
  await connection.manager.save(post)
  const comment = new Comment()
  comment.content = '这是评论的内容'
  comment.post = post
  comment.user = user
  await connection.manager.save(comment)
  await connection.close()

}).catch(error => console.log(error));
