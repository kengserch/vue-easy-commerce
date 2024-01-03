<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'
import { useProductStore } from '@/stores/user/product';

const productStore = useProductStore()
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

    <Product :products="productStore.list">
    </Product>
  </UserLayout>
</template>
