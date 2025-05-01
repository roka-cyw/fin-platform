'use client'

import { Button } from '@/components/ui/button'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts'

// export default function Home() {
//   const { data: accounts, isLoading } = useGetAccounts()

//   if (isLoading) {
//     return <div>Loading ...</div>
//   }

//   return (
//     <div>
//       {accounts?.map(account => (
//         <div key={account.id}>{account.name}</div>
//       ))}
//     </div>
//   )
// }

export default function Home() {
  const { onOpen } = useNewAccounts()

  return (
    <div>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  )
}
