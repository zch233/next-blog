import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="/img.jpg" alt="Vercel Logo" className="logo" />
      <Link href="/post/post">
        <a>To Post</a>
      </Link>
    </div>
  )
}
