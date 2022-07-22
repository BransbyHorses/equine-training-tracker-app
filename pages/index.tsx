import Link from 'next/link'

export default function Home() {
  

  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link href='/equines'>
        <a>Go to the Equines page</a>
      </Link>
    </div>
  )
}
