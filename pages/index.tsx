import {NextPage} from 'next';
import React from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/logo.png';
import Link from 'next/link';

const Wrapper = styled.div`
display: flex;
height: 100vh;
align-items: center;
flex-direction: column;
justify-content: center;
p {
  margin-top: -1em;
  margin-bottom: 1em;
  font-size: 20px;
}
.in {
  font-size: 18px;
  color: rgb(89, 96, 109);
  text-decoration: none;
  border-bottom: 1px solid;
}
`;
const ImageWrapper = styled.div`
width: 300px;
`;
const HomeIndex: NextPage = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img width="100%" src={LogoImage} alt="LOGO"/>
      </ImageWrapper>
      <p>我是一个爱学习的人</p>
      <Link href="/posts"><a className='in'>文章列表</a></Link>
    </Wrapper>
  );
};
export default HomeIndex;