
'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '../_utils/ProductApis'

const ProductSection = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
      getLatestProducts_();
    }, []);
  
    //distinguish callingapi variable with  _
    const getLatestProducts_ = () => {
      ProductApis.getLatestProduct().then((res) => {
        setProductList(res.data.data);
      });
    
    }
  return (
    <div>
      <ProductList productList={productList}/>
    </div>
  )
}

export default ProductSection
