<script setup>
//config
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//component
import Edit from "@/components/icons/Edit.vue";
import Trash from "@/components/icons/Trash.vue";
//store
import { useAdminProductStore } from "@/stores/admin/product";

const adminProductStore = useAdminProductStore();

onMounted(() => {
    adminProductStore.loadProduct();
});

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl font-bold">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add New</RouterLink>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Updated At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(product,index) in adminProductStore.list" :key="index">
                        <th>{{ product.name }}</th>
                        <td>
                            <img :src="product.image" class="w-12" />
                        </td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                        <td>
                            <div 
                                class="badge" 
                                :class="product.status === 'open'? 'badge-success': 'badge-error' ">
                                {{ product.status }}
                            </div>
                        </td>
                        <td>{{ product.updatedAt }}</td>
                        <td>
                            <div class="flex">
                                <RouterLink :to="{name: 'admin-products-update' , params : {id : index}}" class="btn btn-ghost">
                                    <Edit class="w-5"></Edit>
                                </RouterLink>
                                <button @click="removeProduct(index)" class="btn btn-ghost">
                                    <Trash class="w-5"></Trash>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>
