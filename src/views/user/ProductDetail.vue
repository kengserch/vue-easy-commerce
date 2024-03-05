<script setup>

//config
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
//layout
import UserLayout from '@/layouts/UserLayout.vue'
//store
import { useProductStore } from '@/stores/user/product';


const productStore = useProductStore()
const route = useRoute()



const selectedProducts = computed(() => {
    return productStore.loadProduct(route.params.id)
})

</script>


<template>
    <UserLayout>
        <div class="text-2xl text-center">Product Detail</div>
        <div class="text-4xl text-center">{{ selectedProducts.name }} </div>

        <div class="flex my-10">
            <div class="flex">
                <figure>
                    <img class=" w-[500px] h-auto" :src="selectedProducts.imageUrl" />
                </figure>
                <figure>
                    <img class=" w-[500px] h-auto" :src="selectedProducts.imageUrl" />
                </figure>
            </div>
            <div class="ml-10">
                <p class="font-bold text-2xl">{{ selectedProducts.name }}</p>
                <p class="font-normal text-lg">{{ selectedProducts.about }}</p>
                <p class="font-normal text-lg">฿ {{ selectedProducts.price }}</p>
                <p class="font-light text-sm w-[40rem]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos
                    adipisci repellat doloribus unde alias. Exercitationem quis libero atque! Dolorum porro illo maxime
                    minima nulla. Atque natus recusandae corporis fuga dolorum! Cumque commodi est, similique labore
                    minima natus iusto necessitatibus consequuntur laudantium recusandae laborum voluptatibus vero quasi
                    accusamus, eius reprehenderit rem.</p>
            </div>
        </div>

    </UserLayout>
</template>



<style></style>