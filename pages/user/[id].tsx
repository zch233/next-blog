import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import React from 'react';
import Link from 'next/link';
import { userPager } from '../../hooks/usePager';
import { withSession } from '../../lib/withSesstion';
import PageHeader from '../../components/PageHeader';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
`
interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
  user: User;
}

const PostsIndex: NextPage<Props> = ({ user, posts, ...pageOption }) => {
  const { pager } = userPager(pageOption);
  return (
    <Container>
      <PageHeader user={user} />
      {posts.map(post => <p key={post.id}>{post.title}</p>)}
      { pager }
    </Container>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const size = parseInt((context.query.size || 10).toString());
  const page = parseInt((context.query.page || 1).toString());
  const [posts, total] = await connection.manager.findAndCount('Post', {
    where: {
      authorId: context.query.id
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