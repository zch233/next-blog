import React from 'react'
import Link from 'next/link'

export default function Post () {
  return (
    <div>
      <h1>POST</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>

      <style jsx>{`
        h1 {
          display: flex;
        }
      `}</style>
    </div>
  )
}