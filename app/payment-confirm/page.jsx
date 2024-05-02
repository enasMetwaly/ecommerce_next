import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PaymentConfirm = () => {
  return (
    <div className='flex flex-col items-center justify-center px-5 mt-6'>
    <Image 
        src={'/verified.gif'}
        alt='check'
        width={300}
        height={300}
     />
      <h2 className='text-[24px]'>payment Successful</h2>
      <h2 className='text-[17px] text-center mt-6 text-gray-500'>we sent email with all payment details</h2>
      <Link href='/' className='p-2 mt-6 text-white rounded-md bg-primary'>Go to Home</Link>

    </div>
  )
}

export default PaymentConfirm

