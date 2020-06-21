import React, {useEffect,useState} from "react";
import Axios from 'axios'

interface Post {
  id: string,
  date: string,
  content: string,
  title: string,
}
const PostsBSR = () => {
  const [list, setList] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      Axios.get('/api/v1/posts').then(data => {
        setList(data.data)
        setLoading(false)
      })
    }, 3000)
  }, [])
  if (loading) return <div>loading...</div>
  return (
    <div>
      {list.map(v => (
        <div key={v.id}>
          <h1>{v.title}</h1>
          <h2>{v.date}</h2>
          <p>{v.content}</p>
        </div>
      ))}
    </div>
  )
}

export default PostsBSR