import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import React from "react";
import {Post} from "../../src/entity/Post";
import Link from "next/link";


interface Props {
  posts: Post[]
}
const PostsIndex:NextPage<Props> = ({posts}) => {
  return (
    <div className="container">
      <h1>文章列表 <Link href="/posts/new"><a>开始创作</a></Link></h1>
      {posts.map(post => <p key={post.id}><Link href={'/posts/[id]'} as={`/posts/${post.id}`}><a>{post.id}---{post.title}({post.authorId})</a></Link></p> )}
    </div>
  )
}

export default PostsIndex

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}