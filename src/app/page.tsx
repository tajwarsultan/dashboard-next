import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="text-center pt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}