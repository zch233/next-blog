import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import React from 'react';
import { withSession } from '../../lib/withSesstion';
import styled from 'styled-components';
import PostsListPage from '../../components/PostsListPage';
import { useRouter } from 'next/router';
import {Like} from 'typeorm'

const Container = styled.div`
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
  .authorTitle {
    margin: 1em 0;
  }
  .posts {
    margin-bottom: 2em;
  }
  .postItem {
    border-bottom: 1px solid #ddd;
    padding: .7em 0;
    font-size: 18px;
    .content {
      color: #999;
      font-size: 14px;
      margin-top: .4em;
    }
  }
`
interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
  user: User;
}

const PostsResults: NextPage<Props> = (props) => {
  const route = useRouter()
  return (
    <PostsListPage pageTitle={route.query.word.toString()} {...props} />
  );
};

export default PostsResults;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const size = parseInt((context.query.size || 10).toString());
  const page = parseInt((context.query.page || 1).toString());
  const [posts, total] = await connection.manager.findAndCount('Post', {
    where: {
      title: Like(`%${context.query.word}%`),
    },
    take: size,
    skip: (page - 1) * size,
    join: {
      alias: 'post',
      leftJoinAndSelect: {
        author: 'post.author',
      },
    },
  });
  // @ts-ignore
  const user = context.req.session.get('user') || ''
  return {
    props: {
      user,
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
  };
});