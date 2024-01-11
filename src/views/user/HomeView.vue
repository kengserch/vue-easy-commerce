<script setup>
import { useRouter } from 'vue-router';
import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const addToCart = (product) => {
  // console.log('Hello add to cart')
  // console.log(product)
  cartStore.addToCart(product)
  router.push({ name:'cart'})
}
</script>

<template>
  <UserLayout>
    <div class="hero h-96 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Welcome to Shop</h1>
          <p class="py-6">Trust your intuition!</p>
        </div>
      </div>
    </div>

    <Product 
    :products="productStore.list"
    :addToCart="addToCart"
    >
    </Product>
  </UserLayout>
</template>
