import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArticleList,
  Category,
  CategoryWrapper, Container, Footer,
  LatestPostsWrapper,
  LeftSection,
  PageMain,
  PopularList,
  RightSection,
} from '../../styles/posts';
import ALiIcon from '../../components/ALiIcon';
import { getFullDate } from '../../utils/date';
import { withSession } from '../../lib/withSesstion';
import PageHeader from '../../components/PageHeader';
import axios from 'axios';

interface Props {
  posts: Post[];
  total: number;
  page: number;
  totalPage: number;
  size: number;
  user: User;
}

const defaultSize = 10;
const PostsIndex: NextPage<Props> = ({ user, posts, ...pageOption }) => {
  const fetchData = useRef({
    page: 1,
    size: defaultSize,
  });
  const [loading, setLoading] = useState(false);
  const [loadMorePostsVisible, setLoadMorePostsVisible] = useState(true);
  const [hotRank, setHotRank] = useState<Post[]>([])
  const [postsList, setPostsList] = useState<Post[]>(posts);
  const { firstPost, subPosts, restPosts } = useMemo(() => {
    const [firstPost, ...otherPosts] = postsList;
    const subPosts = otherPosts.slice(0, 3);
    const restPosts = otherPosts.slice(3);
    return { firstPost, subPosts, restPosts };
  }, [postsList]);

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    fetchData.current = { ...fetchData.current, page: fetchData.current.page + 1 };
    const { data } = await axios.request({
      url: '/api/v1/posts',
      method: 'get',
      params: fetchData.current,
    }).finally(() => setLoading(false));
    const { posts } = data;
    if (posts.length === 0) {
      setLoadMorePostsVisible(false);
    } else {
      if (posts.length < defaultSize) setLoadMorePostsVisible(false);
      setPostsList([...postsList, ...posts]);
    }
  }, []);

  const getHotRank = async () => {
    const {data} = await axios.get('/api/v1/posts/hot')
    setHotRank(data)
  }
  useEffect(() => {
    getHotRank()
  }, [])

  const Author = (props: {author: User}) => (
    <Link href="/user/[id]" as={ `/user/${ props.author.id }` }>
      <a><span className={ 'author' }><ALiIcon icon={'defaultAvatar'} />{ props.author.username }</span></a>
    </Link>
  )
  return (
    <Container>
      <PageHeader user={ user }/>
      <CategoryWrapper>
        {/*<div><ALiIcon icon={ 'left' }/></div>*/}
        <Category>
          <li className={ 'item' }>分类一</li>
          <li className={ 'item' }>分类二</li>
          <li className={ 'item active' }>分类三</li>
          <li className={ 'item' }>分类四</li>
          <li className={ 'item' }>分类五</li>
        </Category>
        {/*<div><ALiIcon icon={ 'right' }/></div>*/}
      </CategoryWrapper>
      <LatestPostsWrapper>
        <LeftSection>
          {
            !!Object.keys(firstPost || {}).length &&
            <>
              <Link href={ '/posts/[id]' } as={ `/posts/${ firstPost.id }` }>
                <a>
                  <div className={ 'imageWrapper' }>
                    {
                      JSON.parse(firstPost.images)[0] ?
                        <img referrerPolicy={'no-referrer'} src={JSON.parse(firstPost.images)[0]} alt=""/> :
                        <ALiIcon icon={ 'img' }/>
                    }
                  </div>
                  <cite className={ 'title' }>{ firstPost.title }</cite>
                  <p className={ 'content' }>{ firstPost.content.substr(0, 100) }...</p>
                </a>
              </Link>
              <p><Author author={firstPost.author} /></p>
              <time className={ 'time' }>{ getFullDate(firstPost.createdAt) }</time>
            </>
          }
        </LeftSection>
        <RightSection>
          { subPosts.map(post => (
            <article key={ post.id } className={ 'articleItem' }>
              <Link href={ '/posts/[id]' } as={ `/posts/${ post.id }` }>
                <a>
                  <div className={ 'imageWrapper' }>
                    {
                      JSON.parse(post.images)[0] ?
                        <img referrerPolicy={'no-referrer'} src={JSON.parse(post.images)[0]} alt=""/> :
                        <ALiIcon icon={ 'img' }/>
                    }
                  </div>
                </a>
              </Link>
              <div className={ 'postInfo' }>
                <Link href={ '/posts/[id]' } as={ `/posts/${ post.id }` }>
                  <a>
                    <cite className={ 'title' }>{ post.title }</cite>
                    <p className={ 'content' }>{ post.content }</p>
                  </a>
                </Link>
                <p><Author author={post.author} /></p>
                <time className={ 'time' }>{ getFullDate(post.createdAt) }</time>
              </div>
            </article>
          )) }
        </RightSection>
      </LatestPostsWrapper>
      <PageMain>
        <ArticleList>
          { restPosts.map(post => (
            <li key={ post.id } className={ 'articleItem' }>
              <div className={ 'articleItem-info' }>
                <Link href={ '/posts/[id]' } as={ `/posts/${ post.id }` }>
                  <a>
                    <cite className={ 'title' }>{ post.title }</cite>
                    <p className={ 'content' }>{ post.content.substr(0, 150) }...</p>
                  </a>
                </Link>
                <p><Author author={post.author} /></p>
                <time className={ 'time' }>{ getFullDate(post.createdAt) }</time>
              </div>
              {
                !!JSON.parse(post.images)[0] &&
                <Link href={ '/posts/[id]' } as={ `/posts/${ post.id }` }>
                  <a className={ 'articleItem-image' }>
                    <div className={ 'imageWrapper' }>
                      <img referrerPolicy={'no-referrer'} src={JSON.parse(post.images)[0]} alt=""/>
                    </div>
                  </a>
                </Link>
              }
            </li>
          )) }
        </ArticleList>
        <PopularList>
          <h4>最近一周最热</h4>
          { hotRank.map((post, index) => (
            <div key={ post.id } className={ 'popularItem' }>
              <em>0{ index + 1 }</em>
              <div className={ 'popularItem-info' }>
                <Link href={ '/posts/[id]' } as={ `/posts/${ post.id }` }>
                  <a><cite className={ 'title' }>{ post.title }</cite></a>
                </Link>
                <p><Author author={post.author} /></p>
                <time className={ 'time' }>{ getFullDate(post.createdAt) }</time>
              </div>
            </div>
          )) }
        </PopularList>
      </PageMain>
      <Footer>
        { loading ? <p>正在加载</p> : loadMorePostsVisible ? <p onClick={ loadMorePosts }>点击加载更多</p> : <p>暂无更多</p> }<span> 共{ pageOption.total }条</span>
      </Footer>
    </Container>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const [posts, total] = await connection.manager.findAndCount('Post', {
    take: 20,
    order: {
      createdAt: 'DESC',
    },
    join: {
      alias: 'post',
      leftJoinAndSelect: {
        author: 'post.author',
      },
    },
  });
  // @ts-ignore
  const user = context.req.session.get('user') || '';
  return {
    props: {
      user,
      posts: JSON.parse(JSON.stringify(posts)),
      total,
    },
  };
});