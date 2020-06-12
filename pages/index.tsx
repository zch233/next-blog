import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      
      <img src="/img.jpg" alt="Vercel Logo" className="logo" />
      <Link href="/post/post">
        <a>To Post</a>
      </Link>
    </div>
  )
}
