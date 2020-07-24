import React from "react";
import {GetStaticProps, NextPage} from "next";
import {getPosts} from "../../lib/posts";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const PostsBSR: NextPage<Props> = ({posts}) => {
  return (
    <div>
      {posts.map(v => (
        <Link key={v.id} href={`/posts/${v.id}`}>
          <a><h1>{v.title}</h1></a>
        </Link>
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