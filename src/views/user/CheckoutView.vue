<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router"

import UserLayout from "@/layouts/UserLayout.vue";

import { useCartStore } from '@/stores/user/cart'



const FormData = [
  {
    name: '*Email address',
    field: 'email'
  },
  {
    name: '*Name',
    field: 'name'
  },
  {
    name: '*Address',
    field: 'address'
  }
  ,
  {
    name: 'Note',
    field: 'note'
  }
]

const cartStore = useCartStore()
const router = useRouter()

const userFormData = reactive({
  email: '',
  name: '',
  address: '',
  note: ''
})

const payment = () => {

  if (userFormData.email == '' || userFormData.name == '' || userFormData.address == '') {
    return alert("โปรดกรอกข้อมูลให้ครบ");

  }

  cartStore.placeOrder(userFormData)
  router.push({ name: 'success' })
}

</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4">Checkout</h1>
    <div class="flex">
      <section class="flex-auto w-64 bg-base-200 p-8">
        <label v-for="form in FormData" :key="form.field" class="form-control w-full">
          <div class="label">
            <span class="label-text ">{{ form.name }}</span>
          </div>
          <textarea v-if="form.field === 'address'" v-model="userFormData[form.field]" class="textarea"
            :placeholder="form.name"></textarea>
          <input v-else v-model="userFormData[form.field]" type="text" :placeholder="form.name"
            class="input input-bordered w-full" />
        </label>
        <button @click="payment" class="btn btn-neutral w-full mt-4">ชำระเงิน</button>
      </section>
      <section class="flex-auto w-32 bg-slate-200 px-2">
        <div v-for="item in cartStore.items" :key="item" class="flex bg-white m-8 py-4">
          <div class="flex-1">
            <img class="w-full p-4" :src="item.imageUrl">
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full text-black">
              <div>
                <div><b>{{ item.name }}</b></div>
                <div>จำนวน : {{ item.quantity }}</div>
              </div>
              <div class="self-end mr-4">
                <RouterLink :to="{ name: 'cart' }" class="btn w-16">Edit</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="p-4 text-black">
          <div><b>Order Summary</b></div>
          <div class="flex justify-between">
            <div>ราคาสินค้าทั้งหมด</div>
            <div>{{ cartStore.summaryPrice }} ฿</div>
          </div>
          <div class="flex justify-between">
            <div>ค่าส่ง</div>
            <div>0 ฿</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex justify-between p-4 mb-4 text-black">
          <div>ราคาทั้งหมด</div>
          <div>{{ cartStore.summaryPrice }} ฿</div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>
