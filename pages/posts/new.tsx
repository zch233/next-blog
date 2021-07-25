import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import ALiIcon from '../../components/ALiIcon';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  .categoryBar {
    width: 320px;
    overflow-y: auto;
    background-color: #404040;
    color: #f2f2f2;
    &-item {padding: 0 15px;line-height: 2.6;cursor: pointer;font-size: 15px;}
    &-returnLink {
      padding: 30px 18px 5px;
      text-align: center;
      display: block;
      span {
        display: block;
        font-size: 15px;
        padding: 12px 0;
        color: #ec7259;
        border: 1px solid rgba(236,114,89,.8);
        border-radius: 20px;
        transition: border-color .2s ease-in;
        &:hover {
          will-change: border-color;
          color: #ec7259;
          border-color: #ec7259;
        }
      }
    }
    &-newButton {
      font-size: 14px;
      margin-top: 14px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      svg {font-size: 12px;margin-right: .3em;}
    }
  }
  .listBar {
    width: 460px;
    overflow-y: scroll;
    height: 100%;
    &-newButton {
      line-height: 20px;
      font-size: 15px;
      font-weight: 400;
      padding: 20px 0 20px 25px;
      cursor: pointer;
      color: #595959;
    }
    &-list {
      position: relative;
      margin-bottom: 0;
      background-color: #efe9d9;
      border-top: 1px solid #d9d9d9;
      &-item {
        position: relative;
        height: 90px;
        color: #595959;
        background-color: #fff;
        padding: 15px 10px;
        box-shadow: 0 0 0 1px #d9d9d9;
        border-left: 5px solid transparent;
        list-style: none;
        line-height: 60px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        &-count {position: absolute;left: 4px;bottom: 4px;font-size: 12px;}
        &-left {font-size: 25px;flex-shrink: 0;color: #aaa;padding: 0 4px;}
        &-middle {
          flex: 1;
          padding: 0 14px;
          font-size: 14px;
          color: #595959;
          overflow: hidden;
          p {font-size: 18px;color: #333;margin-bottom: 12px;}
          p, span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }
        }
        &-right {font-size: 14px;}
      }
    }
  }
  .writeBar {
    flex: 1;
    position: relative;
    height: 100vh;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    &-title {
      flex-shrink: 0;
      width: 100%;
      padding: 0 80px 10px 40px;
      margin-bottom: 0;
      font-weight: 400;
      line-height: 30px;
      box-shadow: none;
      color: #595959;
      background-color: transparent;
      outline: none;
      border-radius: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: none;
      font-size: 30px;
    }
    &-tools {
      margin: 0;
      list-style-type: none;
      background-color: #d9d9d9;
      border-bottom: 1px solid #ccc;
    }
    &-content {
      width: 100%;
      flex: 1;
      padding: 40px 40px 80px;
      margin-bottom: 0;
      resize: none;
      color: #333;
      background-color: transparent;
      font-size: 18px;
      font-weight: 400;
      line-height: 30px;
      border: none;
      outline: none;
      overflow: auto;
    }
  }
`

const NewPost: NextPage = () => {
  return (
    <Wrapper>
      <div className={'categoryBar'}>
        <Link href="/posts" ><a className={'categoryBar-returnLink'}><span>回首页</span></a></Link>
        <p className={'categoryBar-item categoryBar-newButton'}><ALiIcon icon={'add'} /> 新建文集</p>
        <p className={'categoryBar-item'}>分类二</p>
        <p className={'categoryBar-item'}>分类三</p>
      </div>
      <div className={'listBar'}>
        <div className={'listBar-newButton'}>新建文章</div>
        <ul className={'listBar-list'}>
          <li className={'listBar-list-item done'}>
            <p className={'listBar-list-item-count'}>字数:1502</p>
            <div className={'listBar-list-item-left'}>
              <ALiIcon icon={'poster'} />
            </div>
            <div className={'listBar-list-item-middle'}>
              <p>WebStorm 配置</p>
              <span>如何让 WebStorm 的界面变美观</span>
            </div>
            <ALiIcon className={'listBar-list-item-right'} icon={'setting'} />
          </li>
        </ul>
      </div>
      <div className={'writeBar'}>
        <input className={'writeBar-title'} type="text" placeholder={'请输入标题'} />
        <div className={'writeBar-tools'}><button>保存</button></div>
        <textarea className={'writeBar-content'} placeholder={'请输入内容'} />
      </div>
    </Wrapper>
  );
};

export default NewPost;