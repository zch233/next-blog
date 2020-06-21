import React from "react";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getPost, getPosts} from "../../lib/posts";
interface Props {
  post: Post
}
const PostsDetail:NextPage<Props> = ({post}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.date}</h2>
      <article dangerouslySetInnerHTML={{__html: post.content}}></article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const idList = await getPosts()
  return {
    paths: idList.map(v => ({params: {id: v.id}})),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (paths: any) => {
  const post = await getPost(paths.params.id)
  return {
    props: {
      post,
    }
  }
}

export default PostsDetail