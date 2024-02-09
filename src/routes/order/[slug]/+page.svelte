<script>
    //@ts-nocheck
    import { db } from "$lib/firebase";
    import { fade,fly, } from 'svelte/transition';
    import { doc, updateDoc, collection, where, query, getDocs, getDoc } from "firebase/firestore";
    export let data;
    let { slug } = data;

    import sizingMedium from "$lib/assets/sizingMedium.png";

    const retrieveStatus = async () => {
        const result = await getDoc(doc(db, "orders", slug));
        return(result.data().status);
    }

    let statusPromise = retrieveStatus();
</script>

<div class="w-screen h-screen bg-gray-300">
    <img class="absolute h-full top-1/5 scale-150 opacity-20" src="https://simplemaps.com/static/demos/resources/svg-library/svgs/world.svg" alt="">
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
    {:then status}
        {#if status === "awaiting-payment"}
            <h1>Your order is awaiting payment</h1>
        {:else if status === "awaiting-generation"}
            <div class="relative pt-24 pl-24">
                <h1 class="mb-2 text-5xl font-medium">Track Your Order</h1>
                <p class="mb-10 text-lg">Order details <span>#A452FHFJ8949329384JFSK</span></p>

                <ol class="flex items-center w-3/5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            Creation
                            <span class="text-xs font-normal whitespace-nowrap">8:00 AM, Feb 8, 2023</span>
                        </span>
                    </li>
                    <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span class="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <span class="me-2">2</span>
                            Approval
                        </span>
                    </li>
                    <li class="flex flex-col items-center">
                        <span class="me-2">3</span>
                        Shipping
                    </li>
                </ol>

                <div class="mt-20 w-3/5 py-6 pl-8 pr-16 bg-white rounded-xl shadow-md flex gap-8">
                    <img class="h-40 w-40 object-cover rounded-lg" src={sizingMedium} alt="">
                    
                    <div class="grow flex justify-between">
                        <div class="pt-2 w-3/5">
                            <h2 class="text-xl font-medium">18"24" Large Poster</h2>
                            <p class="mt-1.5 text-gray-500 dark:text-gray-400">Styles: City Life, Eiffel Tower, Beach, Desert, Mountains</p>
                            <p class="mt-1 text-gray-500 dark:text-gray-400">Pet Images: 3842.png, 35995.png</p>
                            <p class="mt-1 text-gray-500 dark:text-gray-400">Name: Piper</p>
                        </div>
    
                        <p class="flex items-center text-lg text-black">
                            1
                            <img class="h-4" src="https://img.icons8.com/ios-filled/50/multiply.png" alt="">
                        </p>
    
                        <p class="flex items-center text-lg text-black">
                            $32.00
                        </p>
                    </div>
                </div>
            </div>
        {:else if status === "revisions-needed"}
            <h1>Your order need revisions</h1>
        {:else if status === "awaiting-approval"}
            <h1>Your order needs your approval</h1>
        {:else if status === "pending-fulfillment"}
            <h1>Your order is pending-fulfillment</h1>
        {:else if status === "shipped"}
            <h1>Your order has been shipped</h1>
        {:else if status === "completed"}
            <h1>Your order has been delivered</h1>
        {:else if status === "refunded"}
            <h1>Your order was refunded</h1>
        {:else}
            <h1>Order not found</h1>
        {/if}
    {/await}
</div>

<style>
    
</style>