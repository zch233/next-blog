import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import React from 'react';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {userPager} from '../../hooks/usePager';
import headerImage from '../../assets/header.png'
import logoImage from '../../assets/logo.png'
import styled from 'styled-components';

interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
}
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .author {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.84);
    font-size: 15px;
    margin: 8px 0;
    &:hover {
      text-decoration: underline;
    }
  }
  .time {
    color: rgba(0, 0, 0, 0.54);
    font-size: 15px;
  }
`
const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`
const ImageWrapper = styled.div`
  width: 150px;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  > a {
    background-color: rgb(212,80,80);
    color: #fff;
    padding: .6em 1.1em;
    border-radius: 2em;
    text-decoration: none;
    transition: all .3s;
    &:hover {
      background-color: rgb(212,60,60);
    }
  }
  > * {
    margin: 0 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`
const UserHeaderWrapper = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  overflow: hidden;
  border: 1px solid #ddd;
`
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
`
const Category = styled.ul`
  list-style: none;
  flex: 1;
  display: inline-flex;
  .item {
    margin: 0 10px;
    color: rgba(0,0,0,.54);
    transition: all .3s;
    &.active {
      color: rgba(0,0,0,.84);
    }
  }
`
const LatestPostsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const LeftSection = styled.section`
  width: 50%;
  border: 1px solid #ddd;
  .imageWrapper {
    background-color: #ddd;
    height: 150px;
    overflow: hidden;
  }
  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin: 17px 0 40px 0;
  }
`
const RightSection = styled.section`
  width: 49%;
  border: 1px solid #ddd;
  .articleItem {
    display: flex;
    .imageWrapper {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin-right: 20px;
      background-color: #ddd;
    }
    .postInfo {
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      .title {
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
        margin-bottom: auto;
      }
    }
  }
`

const PostsIndex: NextPage<Props> = ({posts, ...pageOption}) => {
  const {pager} = userPager(pageOption);
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
        <div>左</div>
        <Category>
          <li className={'item'}>日记</li>
          <li className={'item'}>日记</li>
          <li className={'item active'}>日记</li>
          <li className={'item'}>日记</li>
          <li className={'item'}>日记</li>
          <li className={'item'}>日记</li>
        </Category>
        <div>右</div>
      </CategoryWrapper>
      <LatestPostsWrapper>
        <LeftSection>
          <div className={'imageWrapper'}></div>
          <p className={'title'}>第一篇文章</p>
          <p className={'author'}>一只会飞的猪</p>
          <time className={'time'}>2019-10-12</time>
        </LeftSection>
        <RightSection>
          <article className={'articleItem'}>
            <div className={'imageWrapper'}></div>
            <div className={'postInfo'}>
              <p className={'title'}>第二篇文章</p>
              <p className={'author'}>一只会飞的猪</p>
              <time className={'time'}>2019-10-12</time>
            </div>
          </article>
        </RightSection>
      </LatestPostsWrapper>
      {posts.map(post => <p key={post.id}><Link href={'/posts/[id]'}
                                                as={`/posts/${post.id}`}><a>{post.id}---{post.title}({post.authorId})</a></Link>
      </p>)}
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