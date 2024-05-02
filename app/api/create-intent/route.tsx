import { NextResponse } from 'next/server';
import { Stripe } from 'stripe'; // Use 'stripe' instead of '@stripe/stripe-js' for server-side operations

// Initialize Stripe with a type assertion to handle the TypeScript `!` operator
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-08-16',
});

// Note the lowercase function name and proper parameter definition for a Next.js route handler
export async function POST(request: any) {
  const data:any = await request.json(); // Correct the variable name 'data'
  const amount = data.amount;

  try {
    // Ensure 'currency' is lowercase and 'amount' is calculated in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Ensure multiplication by 100 for cents
      currency: 'usd', // Currency must be lowercase
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 }); // Ensure a valid response structure
  }
}
