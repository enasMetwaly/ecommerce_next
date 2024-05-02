
import { CartContext } from '@/app/_context/CartContext';
import { useUser } from '@clerk/nextjs';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useContext } from 'react';
import OrderApis from '@/app/_utils/OrderApis';
import CartApis from '@/app/_utils/CartApis';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //for order
    const { cart, setCart } = useContext(CartContext)
    const { user } = useUser()

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded, so avoid submitting
            return;
        }

        const handleError = (error) => {
            setLoading(false);
            setErrorMessage(error.message);
        };

        //call create order function beforr trigger validation
        createOrder()

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        try {
            const res = await fetch('/api/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount }),
            });

            if (!res.ok) {
                throw new Error(`Error creating payment intent: ${await res.text()}`); // Fetch the error text
            }

            const jsonResponse = await res.json(); // Read the response once
            const clientSecret = jsonResponse.clientSecret; // Ensure extraction of the correct field

            const result = await stripe.confirmPayment({
                // Elements instance used to create the Payment Element
                clientSecret,
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000/payment-confirm",
                },
            });

            if (result.error) {
                // Show error to your customer (e.g., payment details incomplete)
                handleError(result.error);
            } else {
                // Successful payment confirmation logic
            }
        } catch (error) {
            handleError(error);
        }
    };

    //order function
    const createOrder = () => {
        let productIds = []
        cart.forEach(el => {
            productIds.push(el?.product?.id)

        });
        const data = {
            data: {
                email: user.primaryEmailAddress.emailAddress,
                username: user.fullName,
                amount,
                //  products contain ids of cart items that user will order i obtained ubove
                products: productIds


            }
        }
        OrderApis.createOrder(data).then((res) => {
            if (res) {
                cart.forEach(el => {
                    CartApis.deleteCartItem(el?.id)
                })
            }

        }).then(result => { })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='mx-32 md:mx-[320px] mt-12'>
                <PaymentElement />
                <button className='bg-primary p-2 text-white rounded-md w-full mt-4'>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
