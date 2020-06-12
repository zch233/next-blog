import Link from 'next/link'
import work from 'assets/img.jpg'

export default function Home() {
  return (
    <div className="container">
      
      <img src={work} alt="Vercel Logo" className="logo" />
      <Link href="/post/post">
        <a>To Post</a>
      </Link>
    </div>
  )
}
