<script>
// @ts-nocheck
    import axios from "axios";
    const url = "https://api.cloudinary.com/v1_1/dnyyqiiay/image/upload";

    let step = 1;
    let loading = false;
    let petImg = "";
    let resultImg = "";

    async function uploadImage(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        formData.append("upload_preset", "f5vq8k8j");

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            petImg = data.secure_url;
        });
    }

    const next = () => {
        loading = true;

        const data = {
            prompt: "Cinematic Portrait, Godly Beautiful french supermodel, dynamic lighting, [light + space of James Turrell + Bauhaus architectural forms], BeautyCore, Sharp Details --ar 21:9 --style raw"
        };


        fetch('http://cl.imagineapi.dev/items/images/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer NGk5mP-rCE-AssOBIdlxEQ4ILpZlpziD',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then((response) => {
            console.log(response.data);
            loading = false;
        }).catch(error => {
            console.error(error);
            loading = false;
        });
        
        /*
        axios.post('http://cl.imagineapi.dev/items/images/', data, {
            headers: {
                'Authorization': 'Bearer NGk5mP-rCE-AssOBIdlxEQ4ILpZlpziD',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            loading = false;
        }).catch(error => {
            console.error(error);
            loading = false;
        });
        */

        step++;
    }
</script>


<div class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="text-5xl font-bold mb-12">Cartoon your dog</h1>

    {#if step === 1}
        <p class="text-semibold mb-2.5 text-gray-500 w-1/2 text-left">Upload a photo of your dog below</p>

        <label for="dropzone-file" class="flex flex-col items-center justify-center w-1/2 h-2/5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" on:change={uploadImage} class="hidden" />
        </label>

        <button on:click={next} type="button" class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-1/2 flex justify-center">
            {#if loading}
                <div role="status">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            {:else}
                Next
            {/if}
        </button>
    {:else if step === 2}
        <img src="#" alt="Result">
    {/if}

</div> 
