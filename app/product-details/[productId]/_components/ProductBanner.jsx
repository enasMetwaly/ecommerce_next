import React from 'react'
import Image from 'next/image'
const ProductBanner = ({product}) => {
  return (
    <div >
        <Image 
            src={product?.attributes?.banner?.data?.attributes?.url}
            alt='product-detail-banner'
            width={400}
            height={400}
            className='rounded-lg'
        />
    </div>
  )
}

export default ProductBanner
