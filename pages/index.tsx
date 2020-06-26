import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import React from "react";
import {Post} from "../src/entity/Post";
import Link from "next/link";


interface Props {
  posts: Post[]
}
const Home:NextPage<Props> = ({posts}) => {
  return (
    <div className="container">
      {posts.map(post => <Link href={`/posts/${post.id}`} key={post.id}><a>{post.title}</a></Link> )}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}