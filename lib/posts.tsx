import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from "gray-matter";
import marked from "marked";

const markdownDir = path.join(process.cwd(), '/markdown')

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  const list: Post[] = fileNames.map((fileName, index) => {
    const filePath = path.join(markdownDir, fileName)
    const id = index
    const text = fs.readFileSync(filePath, 'utf-8')
    const {data: {title, date}, content} = matter(text)
    return {
      id, title, date, content: marked(content)
    }
  })
  return list
}

export const getPost = async (id: number) => {
  const filePath = path.join(markdownDir, `${id}.md`)
  const text = fs.readFileSync(filePath, 'utf-8')
  const {data: {title, date}, content} = matter(text)
  const post: Post = {
    id, title, date, content: marked(content)
  }
  return post
}
