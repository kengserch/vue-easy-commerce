<script setup>
//config
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
//layout
import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'
//store
import { useProductStore } from '@/stores/user/product';

const productStore = useProductStore()

const route = useRoute()
const searchText = ref('')


watch(() => route.query.q, (newSearchText) => {
  searchText.value = newSearchText
}, {immediate: true})
const filterProducts = computed(() => {
  return productStore.filterProducts(searchText.value)
})
</script>

<template>
  <UserLayout>
    <div class="text-3xl m-4">Search: <b>{{ searchText }}</b></div>
    <Product :products="filterProducts"></Product>
  </UserLayout>
</template>