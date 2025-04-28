import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <p>This is an aiuthenticated route</p>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}
