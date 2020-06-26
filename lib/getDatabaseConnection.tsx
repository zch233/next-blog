import {createConnection} from "typeorm";

const promise = (function () {
  console.log('创建')
  return createConnection()
})()

export const getDatabaseConnection = async () => {
  return promise
}
