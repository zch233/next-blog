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
  .title {
    display: inline-block;
    font-weight: 600;
    font-style: normal;
  }
  .author {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.84);
    font-size: 15px;
    margin: 8px 0;
    &:hover {
      text-decoration: underline;
    }
  }
  .content {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    margin-bottom: 20px;
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
    font-size: 24px;
    line-height: 28px;
    margin: 17px 0 13px 0;
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
        font-size: 18px;
        line-height: 20px;
        margin-bottom: auto;
      }
    }
  }
`
const PageMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding-top: 70px;
  margin-top: 70px;
  border-top: 1px solid #ddd;
`
const ArticleList = styled.ul`
  list-style: none;
  flex: 1;
  margin-right: 80px;
  .articleItem {
    display: flex;
    &-info {
      flex: 1;
      .title {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 12px;
      }
    }
    .imageWrapper {
      width: 150px;
      margin-left: 25px;
      height: 150px;
      overflow: hidden;
      background-color: #ddd;
    }
  }
`
const PopularList = styled.div`
  width: 428px;
  h4 {
    font-weight: 600;
    color: rgba(0,0,0,.84)
    font-size: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .popularItem {
    display: flex;
    padding-top: 36px;
    em {
      font-size: 34px;
      color: rgba(0,0,0,.15);
      font-style: normal;
    }
    &-info {
      margin-left: 20px;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
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
          <cite className={'title'}>第一篇文章</cite>
          <p className={'content'}>文章简介。。。。。。。。。。。。。。。。</p>
          <p className={'author'}>一只会飞的猪</p>
          <time className={'time'}>2019-10-12</time>
        </LeftSection>
        <RightSection>
          <article className={'articleItem'}>
            <div className={'imageWrapper'}></div>
            <div className={'postInfo'}>
              <cite className={'title'}>第二篇文章</cite>
              <p className={'author'}>一只会飞的猪</p>
              <time className={'time'}>2019-10-12</time>
            </div>
          </article>
        </RightSection>
      </LatestPostsWrapper>
      <PageMain>
        <ArticleList>
          <li className={'articleItem'}>
            <div className={'articleItem-info'}>
              <cite className={'title'}>这是文章的标题</cite>
              <p className={'content'}>文章简介。。。。。。。。。。。。。。。。</p>
              <p className={'author'}>作者</p>
              <time className={'time'}>2020-01-05</time>
            </div>
            <div className={'imageWrapper'}></div>
          </li>
        </ArticleList>
        <PopularList>
          <h4>最近一周最热</h4>
          <div className={'popularItem'}>
            <em>01</em>
            <div className={'popularItem-info'}>
              <cite className={'title'}>这是文章的标题</cite>
              <p className={'author'}>作者</p>
              <time className={'time'}>2020-04-01</time>
            </div>
          </div>
        </PopularList>
      </PageMain>
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