'use client'
import { BadgeCheck, AlertOctagon, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import skeletonProductInfo from './skeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '@/app/_utils/CartApis'
import { CartContext } from '@/app/_context/CartContext'

const ProductInfo = ({ product }) => {
  const {user} =useUser()
  const router =useRouter()
  const {cart,setCart}=useContext(CartContext)
  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      // Add to cart logic
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
  
      CartApis.addToCart(data)
        .then((res) => {
          console.log('Cart created successfully',res.data.data);
          setCart(oldCart=>[
            ...oldCart,{
              id:res?.data?.data?.id,
              product
            }
          ])
        })
        .catch((error) => {
          console.error('Error creating cart:', error);
        }); // Use parentheses to capture the error
    }
  };
  
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
        <button className='flex gap-2  bg-primary hover:bg-teal-600 p-3 rounded-lg text-white'
        onClick={()=>handleAddToCart()}        
        ><ShoppingCart /> Add to cart</button>



      </div>:
      <skeletonProductInfo />}
    </div>
  )
}

export default ProductInfo
