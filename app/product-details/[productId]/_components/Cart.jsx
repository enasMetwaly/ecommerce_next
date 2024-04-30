import { CartContext } from '@/app/_context/CartContext';
import React, { useContext } from 'react';
import Link from 'next/link'
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  console.log('ll',cart)

  return (
    <div
      className='h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto'
    >
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <li key={item?.id} className="flex items-center gap-4">
              {/* Ensure data is properly accessed */}
              <img
                src={item?.product?.attributes?.banner?.data?.attributes?.url}
                alt={item?.product?.attributes?.title || 'Product image'}
                className="h-16 w-16 rounded object-cover"  // Ensure proper class
              />
              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item?.product?.attributes?.title}
                </h3>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                {item?.product?.attributes?.category}
              </h3>
                {/* Other elements */}
              </div>
            </li>
          ))
        ) : (
          <li>No items in cart</li>  // Provide a default message for empty cart
        )}
      </ul>
      
      </div>

      <div className="space-y-4 text-center mt-5">
        <Link
          href="/cart"
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          View my cart ({cart?.length})
        </Link>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
