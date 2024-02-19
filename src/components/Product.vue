<script setup>
import { defineProps } from 'vue';

defineProps({
    products: Array,
    addToCart: Function
})
</script>
<template>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        <div v-for="(product,index) in products" :key="index" class="card w-full bg-base-100 shadow-xl">
            <figure>
                <img class="w-full h-auto" :src="product.imageUrl" />
            </figure>
            <div class="card-body">
                <h2 class="card-title font-bold">{{ product.name }}</h2>
                <p class="font-medium">{{ product.about }}</p>
                <p class="font-medium">฿ {{ product.price }}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="addToCart(product)">Buy Now</button>
                </div>
            </div>
        </div>
    </section>
</template>