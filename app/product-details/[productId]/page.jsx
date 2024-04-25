'use client'
import BreadCrump from '@/app/_components/BreadCrump'
import ProductApis from '@/app/_utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductBanner from './_components/ProductBanner'
import ProductInfo from './_components/ProductInfo'

const ProductDetails = ({params}) => {
    const [productDetails,setProductdetails]=useState({})
    useEffect(()=>{
        getProductById_()

    },[params?.productId])
    const getProductById_=()=>{
        ProductApis.getProductById(params?.productId).then(res=>{
            console.log('product item' ,res.data.data )
            setProductdetails(res.data.data)
        })
    }
  return (
    <div className='px-10 md:px-28 py-8'>
        <BreadCrump/>

      {params?.productId}

      <div className=' grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-2 mt-10  justify-around'>
        <ProductBanner product={productDetails}/>
        <ProductInfo product={productDetails} />
      </div>
    </div>
  )
}

export default ProductDetails
