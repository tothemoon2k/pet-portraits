<script>
    //@ts-nocheck
    import { db } from "$lib/firebase";
    import Stripe from "stripe";
    import { fade,fly, } from 'svelte/transition';
    import {priceIds} from "$lib/stripeHelper.js";
    import { doc, updateDoc, collection, where, query, getDocs, getDoc } from "firebase/firestore";
    export let data;
    let { slug } = data;

    import sizingMedium from "$lib/assets/sizingMedium.png";
    let enlargedImg = null;
    let loading = false;
    let requestingRevisions = false;
    let revisionDetails = "";
    let receiptUrl = "";
    let priceId = "";
    let customerId = "";

    const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
        typescript: true,
    });

    const retrieveStatus = async () => {
        const result = await getDoc(doc(db, "orders", slug));
        let test = result.data();

        const charges = await stripe.charges.list({ customer: test.customerId, limit: 1, expand: ['data.payment_intent'] });
        receiptUrl = charges.data[0].receipt_url;

        customerId = test.customerId;

        priceId = priceIds.find(price => {
            return price.item === test.item && price.size === test.size; 
        });

        priceId = priceId.priceId;

        return(result.data());
    }

    const revisePayment = async () =>{
        loading = true;
        await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerId: customerId,
                items: [{id: priceId, quantity: 1}],
                docRef: slug
            }),
        }).then(data => {
            return data.json();
            loading = false;
        }).then(async data => {
            window.location.replace(data.url);
        })
    }

    const enlargeImg = (url) => {
        enlargedImg = url;
    }

    const closeEnlargedImg = () => {
        console.log("close");
        enlargedImg = null;
    }

    const requestRevisons = () => {
        requestingRevisions = true;
    }

    const closeRevisionRequest = () => {
        requestingRevisions = false;
    }

    const submitRevisions = () => {
        console.log(revisionDetails);
        //Update db with new order status and add their revision requests to db
    }

    let statusPromise = retrieveStatus();
</script>

<div class="w-screen h-screen bg-gray-300">
    <img class="absolute h-full opacity-20" src="https://simplemaps.com/static/demos/resources/svg-library/svgs/world.svg" alt="">
    {#await statusPromise}
        <div transition:fly class="w-full h-full flex flex-col gap-4 justify-center items-center">
            <h1 class="text-4xl font-medium">Loading...</h1>
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    {:then data}
    <div class="absolute w-full h-full flex">
        <div class="relative pt-24 px-16 w-1/2">
            <h1 class="mb-2 text-5xl font-medium">Track Your Order</h1>
            <p class="mb-10 text-lg">Order details <span>#{slug}</span></p>

            <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        Illustration
                        <span class="text-xs font-normal whitespace-nowrap">8:00 AM, Feb 8, 2023</span>
                    </span>
                </li>
                <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span class="me-2">2</span>
                        Approval
                    </span>
                </li>
                <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span class="me-2">3</span>
                        Shipping
                    </span>
                </li>
                <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span class="me-2">4</span>
                        Shipping
                    </span>
                </li>
            </ol>
            

            <div class="mt-20 w-full py-5 pl-5 pr-16 bg-white rounded-xl shadow-md flex items-center gap-8">
                <img class="h-40 w-40 object-cover rounded-lg" src={sizingMedium} alt="">
                
                <div class="grow flex justify-between">
                    <div class="w-full">
                        <h2 class="text-xl font-medium">{data.size || ""} {data.item}</h2>
                        <p class="mt-1.5 text-gray-500 dark:text-gray-400">Styles: {data.styles.join(', ')}</p>
                        <p class="mt-1 text-gray-500 dark:text-gray-400">Pet Images: {data.petPhotos.map((item) => {
                            return (`${item.name.length > 10 ? `${item.name.slice(0,8)}... ${item.name.slice(item.name.lastIndexOf(".") + 1)}` : ""}, `);
                        })}</p>
                        <p class="mt-1 text-gray-500 dark:text-gray-400">Name: {data.name}</p>
                        <a href="{receiptUrl || ""}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline font-medium">Receipt</a>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-4">
                <p class="text-lg text-medium">Something not right?</p>
                <p class="text-sm text-gray-500">Contact us at <span class="text-blue-700">support@adventurepet.io</span> or <span class="text-blue-700">1+ (435) 565-9477</span></p>
            </div>
        </div>
        
        <div class="py-4 px-4 w-1/2 h-full flex flex-col relative">
            {#if data.status === "awaiting-payment"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">Your payment was unsuccessful 😢💳</h2>
                    <p class="text-gray-500">Please update your payment method to process your order</p>  
                    <img class="mx-auto mt-16 w-5/6 rounded-md" src="https://d.newsweek.com/en/full/2088675/dog-looking-unhappy.png?w=1600&h=900&q=88&f=29f85dd0d2035c93261ee155a28e75cf" alt="GIF of Artist Painting">
                
                    <button on:click={revisePayment} disabled={loading ? true : false} class="mx-auto mt-16 w-fit px-5 py-2.5 text-lg rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 flex gap-1 items-center transition-all">
                        {#if loading}
                            <div role="status">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        {:else}
                            <img class="h-6 rotate-6" src="https://img.icons8.com/material-rounded/50/ffffff/lightning-bolt--v1.png" alt="Lightning Bolt">
                            Revise Payment Method
                        {/if} 
                    </button>
                </div>
            {:else if data.status === "awaiting-generation"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12">
                    <h2 class="mb-2 text-2xl font-medium">Sit back, grab a snack 🍿. Your order has been placed and our artists are working on your masterpiece.</h2>
                    <p class="text-gray-500">We'll send you an email when the preview is ready.</p>
                    <img class="mx-auto mt-16 w-5/6 rounded-md" src="https://media1.giphy.com/media/d31vTpVi1LAcDvdm/giphy.gif" alt="GIF of Artist Painting">   
                </div>
            {:else if data.status === "revisions-needed"}
                <h1>Your order need revisions</h1> <!--Simply email them instead, or tell them to check their email. Then once revisions are made we will manually update their order status-->
            {:else if data.status === "awaiting-approval"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">The time has come 🥳! Your preview is ready.</h2>
                    <p class="text-gray-500">Simply select your favorite portrait from below and we'll ship out your order</p>  
                
                    {#if requestingRevisions}
                        <p class="mt-16 mb-1 font-medium leading-7">Revision Details</p>
                        <textarea bind:value={revisionDetails} class="w-full h-40 p-4 rounded-lg border border-gray-400 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-800" placeholder="Please provide details on what you would like to be revised"></textarea>
                        <div class="flex gap-4 mt-8">
                            <button on:click={closeRevisionRequest} type="button" class="w-fit px-8 py-3 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex justify-center items-center gap-2.5">
                                Back
                            </button>
                            <button on:click={submitRevisions} type="button" class="bg-blue-700 grow py-3 h-fit text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center items-center gap-2">
                                Submit Revisions
                            </button>
                        </div>
                    {:else}
                        <div class="flex flex-col items-center">
                            <div class="mt-14 w-full flex flex-wrap gap-y-3 gap-x-5 lg:gap-y-7 lg:gap-x-10">
                                {#each data.preview as img} <!--Fetch Preview Images and loop over that array-->
                                    <div class="relative">
                                        <img on:click={()=>{enlargeImg("https://cdn.midjourney.com/dcd8c161-294a-4965-83ee-d92b7fa1c73d/0_3.webp")}} class="absolute h-4 right-2.5 top-2 opacity-60 hover:opacity-100 z-10 cursor-pointer" src="https://img.icons8.com/ios-filled/50/ffffff/expand--v2.png" alt="">
                                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src={img} alt="">
                                    </div> 
                                {/each} 
                            </div>
                        </div>

                        <button type="button" class="mt-10 w-full bg-blue-700 grow py-3 h-fit text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center items-center gap-2">Submit</button>
                        <button on:click={requestRevisons} class="mt-1 w-full py-3 text-blue-600 font-medium underline">Request Revisions</button>
                    {/if}
                </div>
            {:else if data.status === "submitted-revisions"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">The time has come 🥳! Your preview is ready.</h2>
                    <p class="text-gray-500">Simply select your favorite portrait from below and we'll ship out your order</p>  
                
                    <!--Some subheadline along the lines of keep an eye out on your email for an update from one of our artists-->    
                </div>
            {:else if data.status === "pending-fulfillment"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">We are carefully packing your order and it will be shipped soon 🕐</h2>
                    <p class="text-gray-500">We'll send you an email with the tracking code when your order has been shipped</p>  
                    <img class="mx-auto mt-16 w-5/6 rounded-md" src="https://media1.giphy.com/media/d31vTpVi1LAcDvdm/giphy.gif" alt="GIF of Artist Painting">
                </div>
            {:else if data.status === "shipped"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">Your order is on its way! 🚚 It has been shipped</h2>
                    <p class="text-gray-500">We can't wait for you to see your order in person - we hope it puts a smile on your face!</p>  
                    <input type="hidden" id="hs-clipboard-tooltip" value="npm install preline">

                    <p class="mt-8 mb-0.5 text-sm font-medium leading-7">FedEx Tracking Code</p>
                    
                    <button type="button" class="js-clipboard [--trigger:focus] hs-tooltip relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-clipboard-target="#hs-clipboard-tooltip"
                        data-clipboard-action="copy"
                        data-clipboard-success-text="Copied">
                        https://www.fedex.com/en-us/home.html
                        <span class="border-s ps-3.5 dark:border-gray-700">
                            <svg class="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>

                            <svg class="js-clipboard-success hidden w-4 h-4 text-blue-600 rotate-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>

                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-slate-700" role="tooltip">
                            Copied
                        </span>
                    </button>
                    <!--Update img--><img class="mx-auto mt-16 w-5/6 rounded-md" src="https://media1.giphy.com/media/d31vTpVi1LAcDvdm/giphy.gif" alt="GIF of Artist Painting">
                </div>
            {:else if data.status === "completed"}
                <div class="w-full h-full bg-gray-200 rounded-xl pt-14 px-12 overflow-auto pb-10">
                    <h2 class="mb-2 text-2xl font-medium">Your order was delivered. 📦 We hope you love it!</h2>
                    <p class="text-gray-500">Let us know if you have any questions. Tag us on Instagram for a chance to be featured!</p>  
                    <input type="hidden" id="hs-clipboard-tooltip" value="npm install preline">

                    <p class="mt-8 mb-0.5 text-sm font-medium leading-7">FedEx Tracking Code</p>
                    
                    <button type="button" class="js-clipboard [--trigger:focus] hs-tooltip relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-clipboard-target="#hs-clipboard-tooltip"
                        data-clipboard-action="copy"
                        data-clipboard-success-text="Copied">
                        https://www.fedex.com/en-us/home.html
                        <span class="border-s ps-3.5 dark:border-gray-700">
                            <svg class="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>

                            <svg class="js-clipboard-success hidden w-4 h-4 text-blue-600 rotate-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>

                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-slate-700" role="tooltip">
                            Copied
                        </span>
                    </button>
                    <!--Update img--><img class="mx-auto mt-16 w-5/6 rounded-md" src="https://media1.giphy.com/media/d31vTpVi1LAcDvdm/giphy.gif" alt="GIF of Artist Painting">
                </div>
            {:else if data.status === "refunded"}
                <h1>Your order was refunded</h1>
            {:else}
                <h1>Order not found</h1>
            {/if}
        </div>
    </div>

    {#if enlargedImg}
        <div class="absolute w-screen h-screen enlargeBg z-20 flex justify-center items-center">
            <img on:click={closeEnlargedImg} class="absolute top-5 left-12 h-8 cursor-pointer hover:brightness-90 hover:scale-95 transition-all" src="https://img.icons8.com/ios-filled/200/D4D4D4/delete-sign--v1.png" alt="Enlarged IMG Preview">
            <img class="h-5/6 rounded-2xl" src="https://cdn.midjourney.com/dcd8c161-294a-4965-83ee-d92b7fa1c73d/0_3.webp" alt="Close Img">
        </div>
    {/if}
    {/await}
</div>

<style>
    .box-size{
        width: 10rem;
        height: 10rem;
    }

    .enlargeBg {
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

</style>