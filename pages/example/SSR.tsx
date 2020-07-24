import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";

interface Props {
  ua: string,
}
const PostsSSR: NextPage<Props> = (props) => {
  return (
    <div>
      您的浏览器是{props.ua}
    </div>
  )
}

interface User {
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers["user-agent"]
  return {
    props: {
      ua,
    }
  }
}

export default PostsSSR