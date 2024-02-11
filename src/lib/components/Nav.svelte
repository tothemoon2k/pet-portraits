<script>
    export let light = true;
</script>

<nav class="static lg:absolute w-full flex items-center justify-between pt-4 px-8 md:px-14">
    <div class="flex items-center gap-3">
        <img class="h-7" src="{light ? "https://img.icons8.com/ios-filled/50/ffffff/dog--v1.png" : "https://img.icons8.com/ios-filled/50/dog--v1.png"}" alt="Dog">
        <p class="{light ? "text-white" : "text-black"} text-xl font-semibold ">Adventure Pet</p>
    </div>

    <div class="flex items-center gap-14">
        <ul class="text-white text-sm font-medium items-center gap-10 hidden md:flex">
            <li>All Flight</li>
            <li>Schedule</li>
            <li>Passengers</li>
            <li>Your Orders</li>
        </ul>

        <button type="button" class="hidden md:block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Let's Fly</button>
    </div>
</nav>