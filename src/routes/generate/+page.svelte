<script>
    // @ts-nocheck

    //Packages
    import { onMount, onDestroy } from "svelte";
    import { logicalPropertiesHorizontalSlide, horizontalSlide } from '$lib/components/transitions.js';
    import Stripe from "stripe";
    import { db } from "$lib/firebase.js";
    import { addDoc, collection } from "firebase/firestore";

    //Components
    import Step1 from "$lib/generationComponents/Step1.svelte";
    import Step2 from "$lib/generationComponents/Step2.svelte";
    import Step3 from "$lib/generationComponents/Step3.svelte";

    //Images
    import heroNewCat from "$lib/assets/hero-new-cat.png";

    let step = 3;
    let loading = false;

    const secretStripeKey = import.meta.env.VITE_STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;

    const stripe = new Stripe(secretStripeKey, {
        apiVersion: "2023-10-16",
        typescript: true,
    });

    const next = async () => {
        if(step === 1 && selectedStyles.length){
            step++
        } else if(step === 1 && !selectedStyles.length) {
            alert("Please select at least one style")
        }else if(step === 2 && petPhotos.length){
            step++
        } else if(step === 2 && !petPhotos.length) {
            alert("Please upload at least one photo of your pet, ideally two or three")
        } else if (step === 3 && selectedItem && name){
            const customer = await stripe.customers.create();

            const order = {
                styles: selectedStyles,
                petPhotos: petPhotos,
                item: selectedItem,
                size: selectedSize,
                name: name,
                customerId: customer.id,
                status: "awaiting-payment"
            }

            let priceIds = [
                {item: 'Poster', size: 'Medium 16"x24"', price: 24.99, priceId: 'price_1OhHGLEe5blDhv50pdmr569C'},
                {item: 'Poster', size: 'Large 20"x30"',price: 24.99, priceId: 'price_1OhHGgEe5blDhv50ohNRjPYN'},
                {item: 'Poster', size: 'Huge 24"x36"', price: 24.99, priceId: 'price_1OhHGsEe5blDhv50siAVUOre'},
                {item: 'Blanket', size: 'Medium 16"x24"', price: 24.99, priceId: 'price_1OhHH8Ee5blDhv50oI2mj65z'},
                {item: 'Blanket', size: 'Large 20"x30"', price: 24.99, priceId: 'price_1OhHHMEe5blDhv505VXxgYzA'},
                {item: 'Blanket', size: 'Huge 24"x36"', price: 24.99, priceId: 'price_1OhHHZEe5blDhv50v9F4uvEm'},
                {item: 'Ceramic Mug', size: null, price: 24.99, priceId: 'price_1OhHHqEe5blDhv50EAg3hRcY'},
            ]

            const matchingPrice = priceIds.find(price => {
                console.log(selectedSize)
                return price.item === selectedItem && price.size === selectedSize; 
            });

            const docRef = await addDoc(collection(db, "orders"), order);

            await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: customer.id,
                    items: [{id: matchingPrice.priceId, quantity: 1}],
                    docRef: docRef.id
                }),
            }).then(data => {
                return data.json();
            }).then(async data => {
                window.location.replace(data.url);
            })
        }
    };

    const back = () => {
        if(step > 1) step--;
    }

    const selectedStyles = [];
    let petPhotos = [];
    let selectedItem;
    let selectedSize = null;
    let name = "";

    const handleSelectStyle = (e) => {
        let el = e.detail.el;

        if (el.style.border) {
            el.style.border = '';
            selectedStyles.splice(selectedStyles.indexOf(el.nextElementSibling.textContent), 1);
        } else{
            if(selectedStyles.length < 5) {
                selectedStyles.push(el.nextElementSibling.textContent);
                el.style.border = el.style.border ? '' : '2.5px solid #2563EB';
            }
            else alert("Max of 5 styles reached");
        }
    }

    const handleUploadPhoto = (e) =>{
        loading = true;

        const file = e.detail.el.files[0];

        const fileSize = file.size;

        console.log(fileSize)


        const formData = new FormData();
        formData.append('file', file);

        formData.append("upload_preset", "f5vq8k8j");

        fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: "POST",
            body: formData
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            petPhotos.push({name: file.name, url: data.secure_url});
            petPhotos = petPhotos;
            console.log(petPhotos)
        })
        .catch((err)=>{
            console.log(err);
        }).finally(()=>{
            loading = false;
        })
    }

    const handleSelectItem = (e) => {
        let el = e.detail.el;

        if (el.style.border) {
            el.style.border = '';;
            selectedItem = null;
            selectedSize = null;
        } else{
            if(!selectedItem) {
                selectedItem = el.nextElementSibling.textContent;
                el.style.border = el.style.border ? '' : '2.5px solid #2563EB';
            }
            else alert("Sorry, at the moment you can only select one item per order");
        }
    }

    const handleSelectSize = (e) => {
        let el = e.detail.el;

        if (el.style.border) {
            el.style.border = '';
            selectedSize = null;
        } else{
            if(!selectedSize) {
                selectedSize = el.nextElementSibling.textContent;
                el.style.border = el.style.border ? '' : '2.5px solid #2563EB';
            }
            else alert("Please only select one size");
        }
    }

    const handleNameInput = (e) => {
        name = e.detail;
    }
</script>

<div class="h-screen w-screen flex main-bg">
    <div class="w-1/2 h-full flex flex-col justify-center items-center">
        <div class="w-1/2 p-3 flex flex-col gap-14 relative">
            <div class="w-full relative">
                <button class="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-6 w-12 h-12 p-3.5 rounded-full bg-gray-100 rotate-180 opacity-90 hover:opacity-100 hover:scale-105 transition-all"><img src="https://img.icons8.com/metro/50/forward.png" alt=""></button>
                <img class="w-full" src={heroNewCat} alt="Current review">
                <button class="absolute top-1/2 -translate-y-1/2 right-0 translate-x-6 w-12 h-12 p-3.5 rounded-full bg-gray-100 opacity-90 hover:opacity-100 hover:scale-105 transition-all"><img src="https://img.icons8.com/metro/50/forward.png" alt=""></button>
            </div>

            <div class="px-2 text-center text-gray-700 italic text-sm relative">
                <img class="w-16 ml-8 absolute -top-7" src="https://img.icons8.com/ios-filled/200/d6dbe4/quote-left.png" alt="Quotation"> 
                <p class="absolute z-10">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form. <br> <span class="font-medium text-black">- Topper Brown </span> </p>
            </div>
            
        </div>
    </div>

    <div class="w-1/2 h-full bg-gray-200 rounded-l-3xl pt-24 pl-16 pr-20 relative overflow-auto">
        <h1 class="mb-2 text-4xl font-semibold">Create Your Pet Portrait 🎉</h1>
        <div class="flex items-center gap-1">
            <img class="h-7 brightness-0" src="https://static.vecteezy.com/system/resources/thumbnails/009/343/315/small/five-stars-in-row-glossy-yellow-color-customer-rating-feedback-concept-from-the-client-about-employee-of-website-abstract-3d-render-png.png" alt="">
            <p>15,124</p>
        </div>
        <p class="mt-2 text-2xl font-semibold">$32.00</p>
    
        {#if step === 1}
            <!--
                <div transition:horizontalSlide={{axis: 'y', duration: 600}}>
                    <Step1 on:selectStyle={handleSelectStyle}/>
                </div>
            -->
            <Step1 on:selectStyle={handleSelectStyle}/>
        {:else if step === 2}
            <Step2 {petPhotos} on:uploadPhoto={handleUploadPhoto}/>
        {:else if step === 3}
            <Step3 {selectedItem} on:selectItem={handleSelectItem} on:selectSize={handleSelectSize} on:nameInput={handleNameInput}/>
        {/if}
        

        <div class="flex gap-4 mb-14 mt-8">
            <button on:click={back} type="button" class="{step === 1 ? "hidden" : "block"} w-fit px-8 py-3 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex justify-center items-center gap-2.5">
                Back
            </button>
            <button on:click={next} type="button" class="bg-blue-700 grow py-3 h-fit text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center items-center gap-2">
                {#if loading}
                    <div role="status">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                {:else}
                    {step !== 3 ? "Next" : "Buy Now"} 
                    <img class="{step !== 3 ? "hidden" : "block"} h-5" src="https://img.icons8.com/fluency-systems-filled/100/ffffff/cursor.png" alt="">
                {/if} 
            </button>
        </div>
    </div>
</div>




<style global>
    .main-bg{
        background: #f3f6fa;
    }

    :global(.box-size){
        width: 8.5rem;
        height: 8.5rem;
    }
</style>