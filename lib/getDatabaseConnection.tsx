import "reflect-metadata";
import {Post} from "src/entity/Post";
import {User} from "src/entity/User";
import {Comment} from "src/entity/Comment";
import {Category} from "src/entity/Category";
import {createConnection, getConnectionManager} from "typeorm";
import config from 'ormconfig.json'

const promise = (async function () {
  const manage = getConnectionManager()
  if (manage.has('default')) {
    const connection = manage.get('default')
    await connection.close()
  }
  // @ts-ignore
  return createConnection({
    ...config,
    host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
    database: process.env.NODE_ENV === 'production' ? 'blog' : config.database,
    entities: [Post, User, Comment, Category],
  })
})()

export const getDatabaseConnection = () => {
  return promise
}
