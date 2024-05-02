'use client'
import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const router=useRouter()
    const { cart, setCart } = useContext(CartContext)
    const getTotalAmount = () => {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount = totalAmount + Number(item?.product?.attributes?.price)

        });
        return totalAmount;
    }

    const deleteCartItemFromList = (id) => {
        console.log('id to detelted', id)
        // Delete the item from the backend
        CartApis.deleteCartItem(id)
            .then((res) => {
                console.log("Item deleted successfully", res);
                if(res)
                // Update the local cart state by removing the item with the specified ID
                setCart((oldCart) => oldCart.filter((item) => item.id !== res?.data?.data?.id)); // Remove the item from the local cart
            })
            .catch((error) => {
                console.error("Error deleting cart item:", error);
            });
    }

    return (


        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {cart?.map((item, index) => (
                                <li key={index} className="flex items-center gap-4"> {/* Provide a unique key */}
                                    <img
                                        src={item.product?.attributes?.banner?.data?.attributes?.url || 'default-image-url.jpg'} // Handle undefined cases
                                        alt={item.product?.attributes?.title || 'Product image'}
                                        className="h-16 w-16 rounded object-cover"
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">{item.product?.attributes?.title || 'Product Title'}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">price:</dt>
                                                <dd className="inline">{item.product?.attributes?.price || 'Default Price'}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Category:</dt>
                                                <dd className="inline">{item.product?.attributes?.category || 'Default Category'}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        {item.product?.attributes?.price || 'Default Price'}
                                        <button onClick={() => deleteCartItemFromList(item?.id)} className="text-gray-600 transition hover:text-red-600">
                                            <span className="sr-only">Remove item</span>
                                            {/* Your remove button logic */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">



                                    <div className="flex justify-between !text-base font-medium">
                                        <dt>Total</dt>
                                        <dd>{getTotalAmount()}</dd>
                                    </div>
                                </dl>



                                <div className="flex justify-end">
                                    <button
                                    onClick={()=>router.push(`/checkout?amount=${getTotalAmount()}`)}

                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-gray-500 text-[12px]'>Note:Items will be sent via Email</h2>
                </div>
            </div>
        </section>
    )
}

export default Cart
