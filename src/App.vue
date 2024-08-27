<script setup>
//config
import { onMounted } from "vue";
import { RouterView } from "vue-router";
//store
import { useCartStore } from "@/stores/user/cart";
import { useProductStore } from "@/stores/user/product";
import { useEventStore } from "@/stores/event";

const cartStore = useCartStore();
const productStore = useProductStore();
const eventStore = useEventStore();

onMounted(() => {
    productStore.loadProducts()
});
</script>

<template>
    <div v-if="eventStore.alert" class="toast toast-top toast-center">
        <div v-if="eventStore.data.status === 'success'" class="alert alert-success">
            <span class="text-white">{{eventStore.data.message}}</span>
        </div>
        <div v-if="eventStore.data.status === 'error'" class="alert alert-error">
            <span class="text-white">{{eventStore.data.message}}</span>
        </div>
    </div>
    <RouterView />
</template>

<style scoped></style>
