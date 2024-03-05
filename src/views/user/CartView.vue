<script setup>
import { RouterLink } from 'vue-router';
import UserLayout from '@/layouts/UserLayout.vue'
import Close from '@/components/icons/Close.vue'
import { useCartStore } from '@/stores/user/cart'

const cartStore = useCartStore()

const changeQuantity = (event, index) =>{
  const newQuantity = parseInt(event.target.value) 
  cartStore.updateQuantity(index,newQuantity)
}

</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4">Shopping Cart</h1>
    <div class="flex">
      <div class="flex-auto w-64 bg-base-200 p-4">
        <div v-if="cartStore.items.length === 0" class="text-xl font-bold">
          Cart is Empty
        </div>
        <div v-else class="flex" v-for="(item,index) in cartStore.items" :key="index">
          <div class="flex-1">
            <img class="w-full p-5" :src="item.imageUrl">
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full">
              <div>
                <div class="relative grid grid-cols-2">
                  <div>
                    <div><b>{{item.name}}</b></div>
                    <div>{{item.about}}</div>
                    <div>{{item.price}}</div>
                  </div>
                  <div>
                    <select v-model="item.quantity" class=" w-1/2 p-4 rounded-full cursor-pointer" @change="changeQuantity($event,index)">
                      <option v-for="(quantity,index) in [1, 2, 3, 4, 5]" :key="index">
                        {{ quantity }}
                      </option>
                    </select>
                  </div>
                  <div @click="cartStore.removeItemIncart(index)" class="absolute top-1 right-0">
                    <Close class="fill-white cursor-pointer"></Close>
                  </div>
                </div>
              </div>
              <div>
                <b>Instock</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto w-32 bg-slate-200 p-4">
        <div class="text-xl font-bold text-black">Order Summary</div>
        <div class="my-4 divide-y divide-zinc-300">
          <div class="flex justify-between py-2 text-black">
            <div>ราคาสินค้าทั้งหมด</div>
            <div>{{ cartStore.summaryPrice }}</div>
          </div>
          <div class="flex justify-between py-2 text-black">
            <div>ค่าส่ง</div>
            <div>0</div>
          </div>
          <div class="flex justify-between py-2 text-black">
            <div>ราคารวมทั้งหมด</div>
            <div>{{ cartStore.summaryPrice  }}</div>
          </div>
          <RouterLink :to="{name:'checkout'}" class="btn btn-neutral w-full mt-4">ชำระเงิน</RouterLink>
        </div>
      </div>
    </div>
  </UserLayout>
</template>