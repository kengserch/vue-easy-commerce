<script setup>

//config
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//layout
import UserLayout from '@/layouts/UserLayout.vue'
//store
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

const addToCart = (product) => {
    cartStore.addToCart(product)
     router.push({ name:'cart'})
}

const selectedProducts = computed(() => {
    return productStore.loadProduct(route.params.id)
})

</script>


<template>
    <UserLayout>
        <div class="text-2xl text-center">Product Detail</div>
        <div class="text-4xl text-center underline">{{ selectedProducts.name }} </div>

        <div class="flex my-10">
            <div class="flex">
                <figure>
                    <img class=" w-[500px] h-auto" :src="selectedProducts.imageUrl" />
                </figure>
            </div>
            <div class="ml-10">
                <p class="font-bold text-2xl">{{ selectedProducts.name }}</p>
                <p class="font-normal text-lg">{{ selectedProducts.about }}</p>
                <p class="font-normal text-lg">฿ {{ selectedProducts.price }}</p>
                <p class="font-light text-sm w-[40rem] mt-4">{{selectedProducts.description}}</p>
            </div>
            <button class="btn btn-primary" @click="addToCart(selectedProducts)">Buy Now</button>
        </div>

    </UserLayout>
</template>



<style></style>