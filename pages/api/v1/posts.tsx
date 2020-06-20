import { NextApiHandler } from "next"
import fs, { promises as fsPromise } from 'fs'

const Posts:NextApiHandler = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({name: 'zch'}))
  res.end()
}

export default Posts