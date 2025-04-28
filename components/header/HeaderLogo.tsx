import Link from 'next/link'
import Image from 'next/image'

export const HeaderLogo = () => {
  return (
    <Link href='/'>
      <div className='items-center hidden lg:flex'>
        <Image src='/logo.svg' height={40} width={40} alt='Logo' />
        <p className='font-semibold text-white text-2xl ml-2.5'>Finance</p>
      </div>
    </Link>
  )
}
