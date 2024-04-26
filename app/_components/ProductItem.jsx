import Image from 'next/image'
import React from 'react'
import { List } from 'lucide-react'
import Link from 'next/link'

const ProductItem = ({product}) => {
  return (
    <Link href={`/product-details/${product?.id}`} className=' p-1 border-teal-400 rounded-lg hover:border hover:shadow-md hover:cursor-pointer'>
      <Image src={product?.attributes?.banner?.data?.attributes?.url}
              alt='banner-card'
              width={400}
              height={350}
              className='rounded-t-lg h-[170px] object-cover'
      />
      <div className='flex justify-between p-3 items-center bg-gray-50 rounded-b-lg'>
        <div>
          <h2 className='text-[14px] font-medium line-clamp-1'>{product?.attributes?.title}</h2>
          <h2 className='text-[12px] text-gray-400 gap-1 items-center'>
            <List className='w-4 h-4'/>
            {product?.attributes?.category}
          </h2>
        </div>
        <h2 className='text-[12px] '>{product?.attributes?.title}</h2>
      </div>
    </Link>
  )
}

export default ProductItem
