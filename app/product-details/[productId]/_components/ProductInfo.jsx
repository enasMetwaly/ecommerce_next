import { BadgeCheck, AlertOctagon, ShoppingCart } from 'lucide-react'
import React from 'react'
import skeletonProductInfo from './skeletonProductInfo'

const ProductInfo = ({ product }) => {
  return (
    <div>
      {product?.id?
      <div>
        <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
        <h2 className='text-[15px] text-gray-400'>{product?.attributes?.category}</h2>
        <h2 className='text-[11px] mt-5'>{product?.attributes?.description[0]?.children[0]?.text}</h2>

        <h2 className='flex gap-2 items-center  mt-2 text-[11px] text-gray-500'>
          {product?.attributes?.instantDelivery
            ? <BadgeCheck className='text-green-500 w-5 h-5' />
            : <AlertOctagon className='text-red-500 w-5 h-5' />
          }
          Eligible for Instant Delivery
        </h2>
        <h2 className='text-[32px] text-primary mt-3'>{product?.attributes?.price}$</h2>
        <button className='flex gap-2  bg-primary hover:bg-teal-600 p-3 rounded-lg text-white'><ShoppingCart /> Add to cart</button>



      </div>:
      <skeletonProductInfo />}
    </div>
  )
}

export default ProductInfo
