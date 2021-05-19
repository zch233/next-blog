import { NextPage } from 'next';
import { userPager } from '../../hooks/usePager';
import PageHeader from '../PageHeader';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
    &-title {
      em {color: #ea4335;font-style: normal;}
    }
    &-content {
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
  pageTitle: string;
}

const PostsListPage: NextPage<Props> = ({ pageTitle, user, posts, ...pageOption }) => {
  const router = useRouter()
  const { pager } = userPager(pageOption);
  return (
    <Container>
      <PageHeader user={user} />
      <h1 className={'authorTitle'}>"{pageTitle}" 的博客</h1>
      <section className={'posts'}>
        {posts.map(post => <Link href="/posts/[id]" key={post.id} as={`/posts/${post.id}`}><a>
          <div className={'postItem'}>
            <p className={'postItem-title'} dangerouslySetInnerHTML={{__html: post.title.replace(router.query.word?.toString(), `<em>${router.query.word}</em>`)}} />
            <p className={'postItem-content'}>{post.content.slice(0, 100)}...</p>
          </div>
        </a></Link>)}
      </section>
      { pager }
    </Container>
  );
};

export default PostsListPage;