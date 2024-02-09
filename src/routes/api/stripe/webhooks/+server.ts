// @ts-nocheck

import type { RequestHandler } from "./$types";
import { db } from "$lib/firebase";
import { doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore"; 
import Stripe from "stripe";


const secretStripeKey = import.meta.env.VITE_STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;

const stripe = new Stripe(secretStripeKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const endpointSecret = import.meta.env.VITE_STRIPE_ENDPOINT_SECRET;

export const POST: RequestHandler = async ({request}) => {
    const stripeSignature = request.headers.get("stripe-signature");
    if(!request.body) {
      return new Response("No request body", { status: 400 })
    }

    try {
        const event = stripe.webhooks.constructEvent(await request.text(), stripeSignature, endpointSecret);
        
        switch (event.type) {
          case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log("Successful payment");

            const q = query(
              collection(db, "orders"), 
              where("customerId", "==", "cus_PWPH8B4wXksZKs")
            );

            const querySnapshot = await getDocs(q);
            console.log(await querySnapshot.docs[0].data(), "querySnapshot");
            const orderRef = querySnapshot.docs[0].ref;
            
            await updateDoc(orderRef, {
              status: "awaiting-generation"
            });

            break;
          case 'customer.created':
            const customerCreated = event.data.object;
            // Then define and call a function to handle the event customer.created
            break;
          case 'customer.updated':
            const customerUpdated = event.data.object;
            // Then define and call a function to handle the event customer.updated
            break;
        default:
          console.log(`Unhandled event type ${event.type}`);
        }

        return new Response("Success", { status: 200 });
      } catch (err) {
        console.log(err);
        return new Response(err.message, { status: 400 })
      }

      
};