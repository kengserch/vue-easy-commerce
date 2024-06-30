<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'

import { useCartStore } from '@/stores/user/cart'

const cartStore = useCartStore()
const route = useRoute()
const orderData = ref({})

onMounted(async () => {
    //console.log(route.query.order_id)
    const orderId = route.query.order_id
    if (orderId) {
        try {
          orderData.value = await cartStore.loadCheckout(orderId)
        } catch (error) {
            alert('order unsuccessful')
            location.href = '/'
            console.log('error', error)
        }
    }

    // console.log(cartStore.checkout)
})
</script>

<template>
    <UserLayout>
        <div class="max-w-5xl mx-auto border border-base-200 shadow-xl p-8 my-3">
            <div>
                <div class="text-2xl font-bold">Your Order is Success</div>
                <div>Hi {{ orderData.name }}</div>
                <div>เตรียมรอรับสินค้าขอบคุณได้เลย</div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-4 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.createdAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.orderNumber }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" :key="product" class="grid grid-cols-4 gap-2 mb-4 items-center">
                <div>
                    <img class="w-full" :src="product.imageUrl" />
                </div>
                <div>
                    <b>{{ product.name }}</b>
                </div>
                <div>จำนวน : {{ product.quantity }}</div>
                <div>ราคารวม : {{ product.price * product.quantity }}</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
            <div class="flex justify-between mt-4">
                <div>ค่าส่ง</div>
                <div>0</div>
            </div>
            <div class="flex justify-between mt-4">
                <div>ราคาทั้งสิ้น</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="text-xl font-bold">ขอบคุณที่มาซื้อของเรา</div>
        </div>
    </UserLayout>
</template>
