import React, {useEffect, useState} from "react";
import Axios from "axios";

interface Post {
  id: string,
  date: string,
  content: string,
  title: string,
}
const usePosts= (): [boolean, Post[]] => {
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
  return [loading, list]
}

export default  usePosts