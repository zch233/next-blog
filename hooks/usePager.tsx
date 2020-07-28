import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface PagerOptions {
  total: number;
  page: number;
  totalPage: number;
}

const Page = styled.a`
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;
  &.active {
    color: red;
  }
`

const userPager = ({total, page, totalPage}: PagerOptions) => {
  const pageArr = []
  pageArr.push(1)
  for (let i = page - 2; i <= page + 2; i++) {
    pageArr.push(i);
  }
  pageArr.push(totalPage)
  const pager = (
    <div>
      {page > 1 && <Link href={`?page=${page-1}`}><a>上一页</a></Link>}
      {Array.from(new Set(pageArr))
        .filter(number => number > 0 && number <= totalPage)
        .reduce((result: number[], current) => current - (result[result.length - 1] || 0) === 1 ? result.concat(current): result.concat(-1, current), [])
        .map((pageNumber, index) => pageNumber === -1 ? <Page key={index + '...'}>...</Page> : <Link href={`?page=${pageNumber}`} key={pageNumber}><Page className={pageNumber === page && 'active'}>{pageNumber}</Page></Link>)}
      {page < totalPage && <Link href={`?page=${page+1}`}><a>下一页</a></Link>}
      <span>共 {total} 条</span>
    </div>
  )
  return {pager}
}

export {userPager}