import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import React from 'react';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {userPager} from '../../hooks/usePager';
import headerImage from '../../assets/header.png';
import logoImage from '../../assets/logo.png';
import {
  ArticleList,
  Category,
  CategoryWrapper, Container,
  ImageWrapper, LatestPostsWrapper,
  LeftSection,
  PageHeader, PageMain,
  PopularList,
  RightSection, UserHeaderWrapper,
  UserInfo,
} from './indexStyles';

interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
}

const PostsIndex: NextPage<Props> = ({posts, ...pageOption}) => {
  const {pager} = userPager(pageOption);
  const [firstPost, ...otherPosts] = posts;
  const subPosts = otherPosts.slice(0, 3);
  const restPosts = otherPosts.slice(3)
  return (
    <Container>
      <PageHeader>
        <ImageWrapper>
          <img width="100%" src={headerImage} alt=""/>
        </ImageWrapper>
        <UserInfo>
          <span>搜索</span>
          <span>消息</span>
          <UserHeaderWrapper>
            <img width="130%" src={logoImage} alt=""/>
          </UserHeaderWrapper>
          <Link href="/posts/new"><a>写文章</a></Link>
        </UserInfo>
      </PageHeader>
      <CategoryWrapper>
        <div>&lt;</div>
        <Category>
          <li className={'item'}>分类一</li>
          <li className={'item'}>分类二</li>
          <li className={'item active'}>分类三</li>
          <li className={'item'}>分类四</li>
          <li className={'item'}>分类五</li>
          <li className={'item'}>分类6</li>
        </Category>
        <div>&gt;</div>
      </CategoryWrapper>
      <LatestPostsWrapper>
        <LeftSection>
          <Link href={'/posts/[id]'} as={`/posts/${firstPost.id}`}>
            <a>
              <div className={'imageWrapper'}></div>
              <cite className={'title'}>{firstPost.title}</cite>
              <p className={'content'}>{firstPost.content.substr(0, 100)}...</p>
            </a>
          </Link>
          <p className={'author'}>一只会飞的猪</p>
          <time className={'time'}>{new Date(firstPost.createdAt).toDateString()}</time>
        </LeftSection>
        <RightSection>
          {subPosts.map(post => (
            <article key={post.id} className={'articleItem'}>
              <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                <a><div className={'imageWrapper'}></div></a>
              </Link>
              <div className={'postInfo'}>
                <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                  <a>
                    <cite className={'title'}>{post.title}</cite>
                    <p className={'content'}>{post.content}</p>
                  </a>
                </Link>
                <p className={'author'}>一只会飞的猪</p>
                <time className={'time'}>{new Date(post.createdAt).toDateString()}</time>
              </div>
            </article>
          ))}
        </RightSection>
      </LatestPostsWrapper>
      <PageMain>
        <ArticleList>
          {restPosts.map(post => (
            <li className={'articleItem'}>
              <div className={'articleItem-info'}>
                <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                  <a>
                    <cite className={'title'}>{post.title}</cite>
                    <p className={'content'}>{post.content.substr(0, 150)}...</p>
                  </a>
                </Link>
                <p className={'author'}>作者</p>
                <time className={'time'}>{new Date(post.createdAt).toDateString()}</time>
              </div>
              <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                <a><div className={'imageWrapper'}></div></a>
              </Link>
            </li>
          ))}
        </ArticleList>
        <PopularList>
          <h4>最近一周最热</h4>
          {posts.slice(0, 5).map((post, index) => (
            <div className={'popularItem'}>
              <em>0{index + 1}</em>
              <div className={'popularItem-info'}>
                <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                  <a><cite className={'title'}>{post.title}</cite></a>
                </Link>
                <p className={'author'}>作者</p>
                <time className={'time'}>{new Date(post.createdAt).toDateString()}</time>
              </div>
            </div>
          ))}
        </PopularList>
      </PageMain>
      {pager}
    </Container>
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