import React from 'react';
import headerImage from '../../assets/header.png';
import ALiIcon from '../ALiIcon';
import Link from 'next/link';
import logoImage from '../../assets/logo.png';
import styled from 'styled-components';

const Header = styled.header`
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
  .newPosts {
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
  > svg {
    color: #999;
  }
  > * {
    margin: 0 14px;
    &:last-child {
      margin-right: 0;
    }
  }
  .user {
    display: flex;
    align-items: center;
    .username {margin-left: .5em;}
  }
`
const UserHeaderWrapper = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  overflow: hidden;
  border: 1px solid #ddd;
`
type Props = {
  user: User;
}
const PageHeader: React.FC<Props> = ({user}) => {
  return (
    <Header>
      <ImageWrapper>
        <img width="100%" src={ headerImage } alt=""/>
      </ImageWrapper>
      <UserInfo>
        <ALiIcon icon={'search'} />
        <ALiIcon icon={'message'} />
        {user ? <Link href="/user/[id]" as={`/user/${user.id}`}><a className={'user'}>
          <UserHeaderWrapper>
            <img width="130%" src={ logoImage } alt=""/>
          </UserHeaderWrapper>
          <span className={'username'}>{user.username}</span></a></Link> : <Link href="/sign_in"><a>请登录</a></Link>}
        <Link href="/posts/new"><a className={'newPosts'}>写文章</a></Link>
      </UserInfo>
    </Header>
  );
};


export default PageHeader;