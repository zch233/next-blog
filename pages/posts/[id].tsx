import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import Link from 'next/link';
import marked from 'marked';
import styled from 'styled-components';
interface Props {
  post: Post
}
const Wrapper = styled.main`
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  padding: 40px 0;
  h1 {
    margin-bottom: 10px;
    .author {
      padding-left: 1em;
      font-size: 16px;
    }
  }
  .time {
    color: #aaa;
    margin-bottom: 30px;
  }
  .return {
    color: #c03;
    display: block;
    margin-top: 20px;
  }
`
const PostsDetail:NextPage<Props> = ({post}) => {
  return (
    <Wrapper>
      <h1>{post.title}<span className={'author'}>by：{post.author.username}</span></h1>
      <p className={'time'}>{new Date(post.updatedAt).toDateString()}</p>
      <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}} />
      <Link href="/posts"><a className={'return'}>返回文章列表</a></Link>
    </Wrapper>
  )
}

export default PostsDetail

export const getServerSideProps: GetServerSideProps<any, {id:string}> = async context => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, {
    where: {
      id: context.params?.id,
    },
    join: {
      alias: 'post',
      leftJoinAndSelect: {
        author: 'post.author'
      }
    }
  })
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}
