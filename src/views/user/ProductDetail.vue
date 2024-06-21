<script setup>

//config
import {computed, ref, onMounted } from 'vue';
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
const productIndex = ref(-1)


const productData = ref({

});

const addToCart = (product) => {
    cartStore.addToCart(product)
     router.push({ name:'cart'})
}

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id);
        const selectedProducts = productStore.getProduct(productIndex.value);
        productData.value = selectedProducts;
        console.log(productData.value)
    }
});
</script>
<template>
    <UserLayout>
        <div class="text-2xl text-center">Product Detail</div>
        <div class="text-4xl text-center font-bold mt-4">{{ productData.name }} </div>

        <div class="flex my-10">
            <div class="flex">
                <figure>
                    <img class=" w-[500px] h-auto" :src="productData.imageUrl" />
                </figure>
            </div>
            <div class="ml-10">
                <p class="font-bold text-2xl">{{ productData.name }}</p>
                <p class="font-medium text-lg">฿ {{ productData.price }}</p>
                <p class="font-light text-base w-[40rem] mt-4">{{productData.about}}</p>
            </div>
            <button class="btn btn-primary" @click="addToCart(productData)">Buy Now</button>
        </div>

    </UserLayout>
</template>



<style></style>