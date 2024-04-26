import React from 'react';
import Image from 'next/image';

const ProductBanner = ({ product }) => {
  return (
    <div>
      {product ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="product-detail-banner"
          width={400}
          height={400}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
