import React from "react";
import usePosts from "../../hooks/usePosts";

const PostsBSR = () => {
  const [loading, list] = usePosts()
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