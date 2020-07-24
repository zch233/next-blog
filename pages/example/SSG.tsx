import React from "react";
import {GetStaticProps, NextPage} from "next";
import {getPosts} from "../../lib/posts";

interface Props {
  posts: Post[];
}
const PostsBSR: NextPage<Props> = ({posts}) => {
  return (
    <div>
      {posts.map(v => (
        <div key={v.id}>
          <h1>{v.title}</h1>
          <h2>{v.date}</h2>
          <p>{v.content}</p>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    }
  }
}

export default PostsBSR