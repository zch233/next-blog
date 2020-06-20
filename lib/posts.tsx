import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from "gray-matter";

export const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), '/markdown')
  const fileNames = await fsPromise.readdir(markdownDir)
  const list = fileNames.map(fileName => {
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
