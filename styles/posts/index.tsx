import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
  .imageWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    img {width: 100%;}
    svg {color:#aaa;font-size:30px;}
  }
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
    display: inline-block;
    &:hover {
      text-decoration: underline;
    }
    > svg {margin-right: 8px;font-size: 20px;}
  }
  .content {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.4;
  }
  .time {
    color: rgba(0, 0, 0, 0.54);
    font-size: 15px;
  }
`
export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`
export const ImageWrapper = styled.div`
  width: 150px;
`
export const UserInfo = styled.div`
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
export const UserHeaderWrapper = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  overflow: hidden;
  border: 1px solid #ddd;
`
export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
`
export const Category = styled.ul`
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
export const LatestPostsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const LeftSection = styled.section`
  width: 48%;
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
export const RightSection = styled.section`
  width: 49%;
  .articleItem {
    display: flex;
    margin-bottom: 20px;
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
      overflow: hidden;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 18px;
        line-height: 20px;
        margin-bottom: auto;
        display: block;
      }
      .content {
        margin-top: 5px;
        margin-bottom: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
`
export const PageMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding-top: 60px;
  margin-top: 40px;
  border-top: 1px solid #ddd;
`
export const ArticleList = styled.ul`
  list-style: none;
  flex: 1;
  .articleItem {
    display: flex;
    margin-bottom: 20px;
    &-info {
      flex: 1;
      .title {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 12px;
      }
    }
    &-image {margin-left: 25px;}
    .imageWrapper {
      width: 150px;
      height: 150px;
      overflow: hidden;
      background-color: #ddd;
    }
  }
`
export const PopularList = styled.div`
  width: 320px;
  margin-left: 50px;
  h4 {
    font-weight: 600;
    color: rgba(0,0,0,.84);
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
export const Footer = styled.footer`
  text-align: center;
  margin-bottom: 1em;
  p {
    background-color: #f5f5f5;
    display: inline-block;
    padding: .7em 1em;
    cursor: pointer;
  }
  
`