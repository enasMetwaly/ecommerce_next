

'use client'
import BreadCrump from '@/app/_components/BreadCrump'
import ProductApis from '@/app/_utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductBanner from './_components/ProductBanner'
import ProductInfo from './_components/ProductInfo'
import ProductList from '@/app/_components/ProductList'
import { usePathname } from 'next/navigation'

const ProductDetails = ({ params }) => {
  const path=usePathname();
  console.log('path',path) //.split [product-details,3:productId] i want to use 2 as bread crump
  const [productDetails, setProductdetails] = useState({});
  const [productList, setProductList] = useState([]); // Initialize as an empty array

  useEffect(() => {
    getProductById_();
  }, [params?.productId]);

  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      const productData = res.data.data;
      setProductdetails(productData);

      // Ensure the `productList` is an array, if not set it to an empty array
      const similarProducts = productData.similarProducts || [];
      setProductList(similarProducts);

      getProductListByCategory(productData); // Fetch products by category
    }).catch((err) => {
      console.error("Error fetching product details:", err);
      setProductList([]); // Fallback to empty array in case of error
    });
  };

  const getProductListByCategory = (product) => {
    ProductApis.getProductByCategory(product?.attributes?.category)
      .then((res) => {
        const categoryProducts = res?.data?.data;
        const validProductList = Array.isArray(categoryProducts) ? categoryProducts : [];
        setProductList(validProductList);
      })
      .catch((err) => {
        console.error("Error fetching product list by category:", err);
        setProductList([]); // Fallback to empty array in case of error
      });
  };

  return (
    <div className="px-10 md:px-28 py-8">
      <BreadCrump path={path} />

      {params?.productId}

      <div className="grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-2 mt-10 justify-around">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>

      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        {Array.isArray(productList) ? (
          <ProductList productList={productList} /> // Check if `productList` is an array
        ) : (
          <p>No similar products found.</p> // Fallback message if `productList` isn't an array or is empty
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
