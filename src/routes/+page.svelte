<script>
    import Nav from "$lib/components/Nav.svelte";
    import gradient from "$lib/assets/gradient.png";
    import map from "$lib/assets/map.png";
    import heroOgCat from "$lib/assets/hero-og-cat.png";
    import heroNewCat from "$lib/assets/hero-new-cat.png";
    import heroImg from "$lib/assets/heroImg.png";
    import heroArrow from "$lib/assets/hero-arrow.png";
    import weOutside from "$lib/assets/we-outside.png";
    import style1 from "$lib/assets/style1.png";
    import style2 from "$lib/assets/style2.png";
    import style3 from "$lib/assets/style3.png";
    import style4 from "$lib/assets/style4.png";
    import customerMap from "$lib/assets/customer-map.png";
    import jaylon from "$lib/assets/jaylon.png";

    let reviews = [
        {name: "Bobby Hill", img: "https://img.freepik.com/premium-photo/portrait-white-man-looking-camera-with-open-eyes-scared-drugged_384104-243.jpg", body: "I'm an outdoorsy guy and having a mug with my cat scaling Everest was a total blast - and it arrived literally the next day!"},
        {name: "LaLoni DeCusions", img: "https://starttheconversation.gpstc.org/wp-content/uploads/2022/02/120808873_1016443005268660648_6716269172998096080_n.jpg", body: "As a busy mom, uploading a few pics and getting incredible photos from Adventure Pet in just two hours was so fun - everyone who comes over loves the surfing poster of my dog!"},
        {name: "Enrique Trejo", img: "https://pbs.twimg.com/media/EbD69unWAAg9WeV.jpg", body: "I wanted more than the typical, boring portraits on other sites. Adventure Pet impressed me with the fun posters of my cats taking selfies in front of the empire state building - the hilarious designs make all my guests laugh!"}
    ]

    let backReview = () => {
        if (currentReview === 0) {
            currentReview = reviews.length - 1;
        } else {
            currentReview--;
        }
    }

    let nextReview = () => {
        if (currentReview === reviews.length - 1) {
            currentReview = 0;
        } else {
            currentReview++;
        }
    }

    let currentReview = 0;
</script>




<div class="w-screen h-screen overflow-auto main-bg">
    <div class="w-full h-fit min-h-full radial-hero relative">
        <!--Backgrounds-->
        <div class="absolute w-full h-full">
            <img class="absolute" src={gradient} alt="Just a lil gradient">
            <img class="w-5/6 left-24 absolute top-1/2 -translate-y-1/2" src={map} alt="Map background effect">
        </div>

        <Nav/>

        <div class="pt-8 pb-10 lg:pb-0 w-full min-h-screen flex flex-col justify-center items-center gap-10 lg:gap-0 lg:justify-start lg:flex-row">
            <!--
            <div class="mb-8 h-full flex items-center gap-10">
                <img class="h-full" src={heroOgCat} alt="Og Cat">
                <img class="h-10" src={heroArrow} alt="Arrow">
                <img class="h-full" src="{heroNewCat}" alt="Traveling Cat">
            </div>

            <div>
                <h1 class="mb-1 text-5xl text-center text-white font-semibold">Fun Pet portraits</h1>
                <h2 class="text-gray-400 text-center font-medium">One of the advantages of being disorganized is that one is always having surprising discoveries</h2>
            </div>
            -->

            
            <div class="order-2 lg:w-1/2 lg:h-full flex flex-col items-center justify-end lg:justify-center lg:items-end relative">
                <h1 class="mb-3.5 text-white font-bold text-4xl md:text-6xl w-hero relative">Fun 
                    <span class="py-1 px-1.5 bg-purple-500">
                        Custom 
                    </span>
                    Pet Portraits
                    <!--
                    <span class="ml-3 absolute -bottom-2 -left-4 -rotate-1 bg-purple-500 text-white p-2">
                        <p class="rotate-1">Portraits</p>
                    </span>
                    -->
                </h1>
                <p class="text-left font-medium text-gray-400 text-sm md:text-md lg:text-lg w-hero">From climbing Mount Everest to lounging on a private jet - adventure awaits your pet. Get your poster, mug or blanket today!</p>
                
                <div class="mt-11 w-hero">
                    <a href="/generate" class="w-fit px-6 py-3 md:text-xl rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 flex gap-1 items-center transition-all"><img class="h-6 rotate-6" src="https://img.icons8.com/material-rounded/50/ffffff/lightning-bolt--v1.png" alt="">Get Started in Minutes</a>
                    <div class="hidden lg:block mt-20 w-hero">
                        <div class="mb-2 flex">
                            <img class="relative w-11 h-11 rounded-full object-cover" src="https://i.ytimg.com/vi/9pNcL7ZKhcM/maxresdefault.jpg" alt="">
                            <img class="relative -left-4 w-11 h-11 rounded-full object-cover" src="https://patrick-oneil.com/wp-content/uploads/2017/08/crackhead.jpg" alt="">
                            <img class="relative -left-8 w-11 h-11 rounded-full object-cover" src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Afb369665-2329-452f-96a9-d53e3f633888?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1" alt="">
                            <img class="relative -left-12 w-11 h-11 rounded-full object-cover" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-01/240122-afghanistan-taliban-mb-0847-bb60a8.jpg" alt="">
                        </div>
                        <p class="text-gray-300 font-medium">Join over 1,500+ happy pet owners</p>
                    </div>
                </div>
            </div>
            

            <div class="w-full flex items-center justify-center md:justify-start md:w-3/4 lg:order-3 lg:-mt-4 lg:w-1/2 lg:h-full">
                <img class="z-10 w-hero" src="{heroImg}" alt="Traveling Cat">
            </div>
        </div>

        <!--
        <div class="w-5/6 absolute -bottom-36 left-1/2 -translate-x-1/2">
            <div class="flex">
                <div class="bg-blue-600 py-4 px-10 rounded-t-lg">
                    <p class="font-semibold text-white">Start Creating</p>
                </div>
            </div>

            <div class="pb-12 px-8 flex flex-col bg-white shadow-lg rounded-b-lg rounded-tr-lg">
                <h2 class="font-semibold text-lg pt-4">Select a Few Styles</h2>

                <div class="mt-4 w-full flex justify-between">
                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/f641784a-9ff0-44b5-9976-2f2ae8fbf978/0_0.webp" alt="">
                        <p class="text-lg text-center font-medium">City Life</p>
                    </div>
                
                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/c0c3dd03-17bc-4422-9cbd-597cea6b936b/0_0.webp" alt="">
                        <p class="text-lg text-center font-medium">Eiffel Tower</p>
                    </div>
                
                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/a7bba53c-8303-4e1e-b133-d16fbac2ba65/0_2_640_N.webp?method=shortest&qst=6&quality=15" alt="">
                        <p class="text-lg text-center font-medium">Beach</p>
                    </div>

                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/b735e41f-1d3c-471b-b0a7-abf6ab050563/0_0.webp" alt="">
                        <p class="text-lg text-center font-medium">Surfing</p>
                    </div>
                
                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/492bad03-43f5-46de-abcc-b2d2a8d72c1b/0_3.webp" alt="">
                        <p class="text-lg text-center font-medium">Desert</p>
                    </div>
                
                    <div>
                        <img class="mb-2 box-size rounded-xl shadow-sm border border-gray-400 object-cover cursor-pointer hover:brightness-95 transition-all" src="https://cdn.midjourney.com/dcd8c161-294a-4965-83ee-d92b7fa1c73d/0_3.webp" alt="">
                        <p class="text-lg text-center font-medium">Mountains</p>
                    </div>
                </div>

                <button class="text-white font-semibold bg-blue-600 py-4 px-10 rounded-lg absolute -bottom-7 right-32">
                    Next
                </button>

                
            </div>
        </div>
            -->
    </div>

    <div class="mt-24 md:mt-32 lg:mt-40 mx-auto w-5/6 flex flex-col lg:flex-row gap-16 items-center justify-center">
        <div class="w-full lg:w-1/2">
            <h3 class="mb-14 text-4xl font-bold pr-2">Only the best for your lovely pet</h3>

            <div class="grid md:grid-cols-2 gap-10">
                <div>
                    <div class="mb-2 flex items-center gap-1.5 md:gap-2.5">
                        <img class="h-10 w-10 p-2.5 bg-white rounded-full object-cover flex items-center justify-center" src="https://img.icons8.com/material-rounded/100/in-transit.png" alt="">
                        <p class="font-medium">Free Next Day Shipping</p>
                    </div>
                    
                    <p class="text-gray-500 text-sm font-medium">No one likes paying shipping fees, next-day delivery is included for free!</p>
                </div>

                <div>
                    <div class="mb-2 flex items-center gap-2.5">
                        <img class="h-10 w-10 p-2 bg-white rounded-full object-cover flex items-center justify-center" src="https://img.icons8.com/ios-glyphs/100/preview-pane.png" alt="">
                        <p class="font-medium">Quick Preview & Unlimited Revisions</p>
                    </div>
                    
                    <p class="text-gray-500 text-sm font-medium">Get your preview in under 2 hours. If something’s not right, we’ll revise it until it’s perfect!</p>
                </div>

                <div>
                    <div class="mb-2 flex items-center gap-2.5">
                        <img class="h-10 w-10 p-2 bg-white rounded-full object-cover flex items-center justify-center" src="https://img.icons8.com/ios-glyphs/100/exhibition.png" alt="">
                        <p class="font-medium">Gallery Quality Portraits</p>
                    </div>
                    
                    <p class="text-gray-500 text-sm font-medium">Each masterpiece is carefully planned and crafted by our team of award winning artists.</p>
                </div>

                <div>
                    <div class="mb-2 flex items-center gap-2.5">
                        <img class="h-10 w-10 p-2.5 bg-white rounded-full object-cover flex items-center justify-center" src="https://img.icons8.com/material/100/paper.png" alt="">
                        <p class="font-medium">Museum Grade Materials</p>
                    </div>
                    
                    <p class="text-gray-500 text-sm font-medium">We only print using museum grade materials crafted to preserve your pet’s art for years.</p>
                </div>
            </div>
        </div>

        <img class="w-full lg:w-1/2 rounded-lg" src="https://cuddleclones.com/cdn/shop/files/pinkpaws-1_17_600x.png?v=1690806433" alt="">
    </div>

    <div class="mt-52 mx-auto w-5/6 flex flex-col lg:flex-row gap-16 items-center justify-center">
        <img class="w-full lg:w-1/2 md:p-10 rounded-lg" src={weOutside} alt="">

        <div class="w-full lg:w-1/2">

            <h3 class="mb-10 text-4xl font-bold">How It Works</h3>

            <ul class="flex flex-col gap-8 text-black">
                <li class="flex items-center gap-7">
                    <img class="w-10 h-10 object-cover" src="https://img.icons8.com/ios-filled/200/dog--v2.png" alt="">
                    <div>
                        <p class="font-medium">Upload your pet photo</p>
                        <p class="text-gray-500 text-sm">Upload 1-3 photos of your beloved pet. Ideally photos where its face is clearly visible. If it’s not right, we’ll contact you.</p>
                    </div>
                </li>

                <li class="flex items-center gap-7">
                    <img class="w-10 h-10 object-cover" src="https://img.icons8.com/ios-glyphs/200//vertical-settings-mixer.png" alt="">
                    <div>
                        <p class="font-medium">Choose a few styles and your product</p>
                        <p class="text-gray-500 text-sm">From surfing in hawaii to flying an airplane, choose 1-5 styles and complete your order with a hand crafted poster, blanket, or mug.</p>
                    </div>
                </li>

                <li class="flex items-center gap-7">
                    <img class="w-10 h-10 object-cover" src="https://img.icons8.com/material-rounded/200/in-transit.png" alt="">
                    <div>
                        <p class="font-medium">Artist Illustration</p>
                        <p class="text-gray-500 text-sm">Once you place your order, our artists begin planning and illustrating your portrait.</p>
                    </div>
                </li>

                <li class="flex items-center gap-7">
                    <img class="w-10 h-10 object-cover" src="https://img.icons8.com/material-rounded/200/in-transit.png" alt="">
                    <div>
                        <p class="font-medium">Pick Your Favorite & Delivery</p>
                        <p class="text-gray-500 text-sm">After placing your order, we’ll send you a preview within 2hrs with multiple images from each style you chose. Simply select your favorite photo and we’ll mail your order with next-day shipping.</p>
                    </div>
                </li>
            </ul>

            <a href="/generate" class="mt-10 w-fit px-5 py-2.5 text-lg rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 flex gap-1 items-center transition-all"><img class="h-6 rotate-6" src="https://img.icons8.com/material-rounded/50/ffffff/lightning-bolt--v1.png" alt="Lightning Bolt">Get Started</a>
        </div>
    </div>

    <div class="mt-32 mx-auto w-5/6 border shadow-lg rounded-xl">
        <ul class="w-full py-14 px-8 flex justify-start items-center flex-wrap gap-8 lg:justify-around lg:gap-0">
            <li>
                <img class="h-7 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1200px-CNN.svg.png" alt="">
            </li>
            <li>
                <img class="h-8 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/a/a8/HGTV_2010.svg" alt="">
            </li>
            <li>
                <img class="h-7 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/VOGUE_LOGO.svg/2560px-VOGUE_LOGO.svg.png" alt="">
            </li>
            <li>
                <img class="h-7 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Reader%27s-Digest-Logo.svg/800px-Reader%27s-Digest-Logo.svg.png?20121020133827" alt="">
            </li>
            <li>
                <img class="w-36 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/RealSimple.svg/1280px-RealSimple.svg.png" alt="">
            </li>
            <li>
                <img class="h-7 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/e/ed/BRIDES_mainLogo_rgb.png" alt="">
            </li>
            <li>
                <img class="h-7 grayscale" src="https://www.sophistiplate.com/cdn/shop/articles/Apartment_Therapy_Logo.png?v=1676413791" alt="">
            </li>
            <li>
                <img class="h-7 grayscale" src="https://southernhomemagazine.com/wp-content/uploads/2018/03/SHM_logo_0318_544x180.png" alt="">
            </li>
        </ul>
    </div>

    <div class="mt-44 mx-auto w-5/6 flex flex-col items-center">
        <div class="mb-10">
            <h3 class="mb-3 text-4xl font-bold text-center">Over 100+ Unique Styles</h3>
            <p class="font-semibold text-blue-600 text-xl text-center">From skiing into the alps to acting as James Bond</p>
        </div>
        
        <div class="w-full flex gap-3 md:gap-4 justify-center lg:justify-between flex-wrap">
            <img class="h-56 md:h-96" src={style1} alt="">
            <img class="h-56 md:h-96 lg:translate-y-10" src={style2} alt="">
            <img class="h-56 md:h-96" src={style3} alt="">
            <img class="h-56 md:h-96 lg:translate-y-10" src={style4} alt="">
        </div>

        <a href="/generate" class="mt-16 w-fit px-5 py-2.5 text-lg rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 flex gap-1 items-center transition-all"><img class="h-6 rotate-6" src="https://img.icons8.com/material-rounded/50/ffffff/lightning-bolt--v1.png" alt="Lightning Bolt">Get Started</a>
    </div>

    <div class="mt-44 mx-auto w-5/6 flex flex-col items-center">
        <div class="mb-10 text-center">
            <p class="mb-3 font-semibold text-blue-600 text-xl text-center">What’s our customer saying</p>
            <h3 class="text-4xl font-bold">Our Customer Feedback</h3>
        </div>

        <div class="w-full flex gap-2 items-center">
            <img class="hidden md:block w-2/5 lg:w-1/2" src={customerMap} alt="">

            <div class="w-full grow">
                <div class="w-5/6 h-fit mx-auto bg-white flex flex-col gap-4 py-7 px-4 rounded-lg shadow-sm">
                    <div class="flex items-center gap-3.5">
                        <img class="h-14 w-14 object-cover rounded-full" src={reviews[currentReview].img} alt="Jaylon">
    
                        <div>
                            <p class="text-lg font-semibold">{reviews[currentReview].name}</p>
                            <img class="-translate-y-1 h-7" src="https://static.vecteezy.com/system/resources/thumbnails/009/343/315/small/five-stars-in-row-glossy-yellow-color-customer-rating-feedback-concept-from-the-client-about-employee-of-website-abstract-3d-render-png.png" alt="">
                        </div>
                    </div>
    
                    <p class="text-gray-700 italic">{reviews[currentReview].body}</p>
                </div>

                <div class="mt-7 w-fit mx-auto flex gap-3">
                    <button on:click={backReview} class="w-12 h-12 p-3.5 rounded-full bg-blue-200 rotate-180 hover:scale-105"><img src="https://img.icons8.com/metro/50/forward.png" alt=""></button>
                    <button on:click={nextReview} class="w-12 h-12 p-3.5 rounded-full bg-blue-600 hover:scale-105"><img src="https://img.icons8.com/metro/50/ffffff/forward.png" alt=""></button>
                </div>
            </div>
        </div>
    </div>

    <div class="mx-auto mt-52 mb-10 w-5/6 bg-gray-200 py-20 rounded-xl">
            <section class="mx-auto w-5/6">
                <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
                    <div class="grid pt-8 text-left border-t border-gray-400 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        <div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What types of pets can you create portraits for?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">We specialize in creating custom portraits for dogs and cats. So if you have a photo of your dog or cat, we can transform it into unique art showcasing your furry friend's adventurous side!</p>
                            </div>
                            <div class="mb-10">                        
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What photo formats do you accept?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">We accept almost all major photo formats (JPG, PNG, TIFF, RAW, etc.) as long as the file size is under 20MB. You can upload nearly any file type and our system will attempt to convert it automatically. In rare cases of incompatible formats, we'll reach out to request an alternate file type that we can work with.</p>
                            </div>
                            <div class="mb-10">                        
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What products can I order with my pet's portrait?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Museum-quality art posters - available in multiple sizes, printed on thick premium matte paper. Plush fleece blankets - Perfect for keeping you and your pet warm and comfy. Premium fleece with an exceptionally clear printed portrait. Ceramic coffee mugs - beautifully printed 11 oz mugs, microwave and dishwasher safe.</p>
                            </div>
                        </div>
                        <div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Do you edit or retouch my pet’s photos?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">We keep edits to a minimum, focusing on seamlessly integrating your pet into the fun design you select. However, we occasionally do basic touch-ups like adjusting brightness/contrast, removing red eye, and fixing minor blemishes when needed.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What’s the turnaround time?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Our artists will send you a preview within 2 hours of ordering, after you select your favorite. We'll print ship your order with complimentary next-day delivery.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What if I'm unsatisfied with my portrait preview?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">We offer unlimited revisions to get your pet’s portrait just right. Not happy after a few revisions? We’ll issue a full money back guarantee, no problem!</p>
                            </div>
                        </div>
                    </div>
                </div>
              </section>
    </div>

    <div class="mt-32 mx-auto w-5/6">
        <div class="flex w-full justify-between items-center">
            <div class="flex items-center gap-0.5">
                <img class="h-9 brightness-0" src="https://static.vecteezy.com/system/resources/thumbnails/009/343/315/small/five-stars-in-row-glossy-yellow-color-customer-rating-feedback-concept-from-the-client-about-employee-of-website-abstract-3d-render-png.png" alt="">
                <p>15,124</p>
            </div>

            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Write a review</button>
        </div>

        <div class="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-20">
            {#each Array(10) as _}
                <div class="w-full rounded-md overflow-hidden">
                    <img class="w-full" src="https://popyourpup.com/cdn/shop/products/custom-pet-art-poster-135461.jpg?v=1618883960" alt="">

                    <div class="pt-2.5 px-3 pb-4 border border-gray-300 rounded-b-md">
                        <p class="font-semibold flex gap-2 items-center">Lilly <img class="h-5" src="https://img.icons8.com/sf-regular-filled/100/tiktok-verified-account.png" alt="Verified Review Icon"></p>
                        <p class="text-gray-400 text-xs">2/2/2024</p>

                        <img class="-translate-x-1.5 mb-2 h-7 brightness-0" src="https://static.vecteezy.com/system/resources/thumbnails/009/343/315/small/five-stars-in-row-glossy-yellow-color-customer-rating-feedback-concept-from-the-client-about-employee-of-website-abstract-3d-render-png.png" alt="">
                        
                        <p class="text-sm">Thank you for capturing the beautiful essence of my fur babies. I love it! 💕</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>




<style>
    *{
        font-family: 'Montserrat', sans-serif;
    }

    .w-hero{
        width: 83%;
    }

    .w-heroImg{
        width: 85%;
    }

    .top-pet{
        top: 72%;
    }

    .h-hero{
        height: 94%;
    }

    .hero-img{
        width: 58%;
    }

    .main-bg{
        background: #f3f6fa;
    }

    .howBorder{
        border: #dee1e5;
        border-style: none none none dashed;
    }

    .radial-hero{
        background: radial-gradient(#12144E, rgb(37, 37, 37));
    }

    .box-size{
        width: 8.5rem;
        height: 8.5rem;
    }
</style>