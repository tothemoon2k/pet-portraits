// @ts-nocheck

import type { RequestHandler } from "./$types";
import Stripe from "stripe";

const secretStripeKey = import.meta.env.VITE_STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
const stripe = new Stripe(secretStripeKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});

//localhost:3000/api/stripe/checkout

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    const items = data.items;
    const customerId = data.customerId;
    const docId = data.docRef;

    console.log(docId);

    //stripe is looking for [{price: "idBlahBlah", quantity: 1}]

    let lineItems : any = [];
    items.forEach((item: any) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/order/${docId}`, //http://localhost:5173/order/${id}
        cancel_url: `http://localhost:5173/order/${docId}`, //http://localhost:5173/order/${id}
    });

    return new Response(
        JSON.stringify({url: session.url}),
        {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
    );
};