<script setup>
//config
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//component
//store
import { useAdminOrderStore } from "@/stores/admin/order";

const orderIndex = ref(-1);
const route = useRoute();
const adminOrderStore = useAdminOrderStore();
const orderData = ref({
    product: [],
});

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id);
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value);
        orderData.value = selectedOrder;
    }
});
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4">
            <div class="text-2xl font-bold">Order detail id : {{ orderIndex }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">Order Date</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Order Number</div>
                    <div>{{ orderData.no }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment Method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="(product, index) in orderData.products" :key="index" class="grid grid-cols-4 gap-2 items-center">
                <div class="mx-auto">
                    <img class="p-2 w-28" :src="product.imageUrl" />
                </div>
                <div>
                    <div class="font-bold">{{ product.name }}</div>
                    <div>{{ product.description }}</div>
                </div>
                <div>จำนวน {{ product.quantity }} ชิ้น</div>
                <div>{{ product.price }} ฿</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }} ฿</div>
            </div>
            <div class="flex justify-end mt-4">
                <RouterLink :to="{name:'admin-orders-list'}" class="btn btn-ghost">Back</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>
