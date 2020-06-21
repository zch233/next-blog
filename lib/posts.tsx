import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from "gray-matter";

const markdownDir = path.join(process.cwd(), '/markdown')

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  const list: Post[] = fileNames.map(fileName => {
    const filePath = path.join(markdownDir, fileName)
    const id = fileName.replace(/\.md$/, '')
    const text = fs.readFileSync(filePath, 'utf-8')
    const {data: {title, date}, content} = matter(text)
    return {
      id, title, date, content
    }
  })
  return list
}

export const getPost = async (id: string) => {
  const filePath = path.join(markdownDir, `${id}.md`)
  const text = fs.readFileSync(filePath, 'utf-8')
  const {data: {title, date}, content} = matter(text)
  return {
    id, title, date, content
  }
}
