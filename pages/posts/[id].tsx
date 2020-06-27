import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
interface Props {
  post: Post
}
const PostsDetail:NextPage<Props> = ({post}) => {
  return (
    <div>
      <h1>标题：{post.title}</h1>
      <div>{post.content}</div>
    </div>
  )
}

export default PostsDetail

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params.id
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post,1)
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}
