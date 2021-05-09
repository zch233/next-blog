import '../styles/global.scss'
import 'github-markdown-css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
