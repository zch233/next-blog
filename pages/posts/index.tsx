import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import React from 'react';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {userPager} from '../../hooks/usePager';

interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
}

const PostsIndex: NextPage<Props> = ({posts, ...pageOption}) => {
  const {pager} = userPager(pageOption);
  return (
    <div className="container">
      <h1>文章列表 <Link href="/posts/new"><a>开始创作</a></Link></h1>
      {posts.map(post => <p key={post.id}><Link href={'/posts/[id]'}
                                                as={`/posts/${post.id}`}><a>{post.id}---{post.title}({post.authorId})</a></Link>
      </p>)}
      {pager}
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection();
  const size = parseInt((context.query.size || 10).toString());
  const page = parseInt((context.query.page || 1).toString());
  const [posts, total] = await connection.manager.findAndCount('Post', {take: size, skip: (page - 1) * size});
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
  };
};