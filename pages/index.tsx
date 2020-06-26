import {GetServerSideProps} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import React from "react";
import {Post} from "../src/entity/Post";

export default function Home() {
  return (
    <div className="container">
      首页11
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  console.log(posts)
  return {
    props: {}
  }
}