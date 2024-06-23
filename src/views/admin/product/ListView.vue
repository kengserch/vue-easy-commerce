<script setup>
//config
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//component
import Edit from "@/components/icons/Edit.vue";
import Trash from "@/components/icons/Trash.vue";
import Table from "@/components/Table.vue";

//store
import { useAdminProductStore } from "@/stores/admin/product";

const adminProductStore = useAdminProductStore();

onMounted(async () => {
    await adminProductStore.loadProducts();
});

const removeProduct = async (index) => {
    try {
        await adminProductStore.removeProduct(index);
        await adminProductStore.loadProducts();
    } catch (error) {
        console.log("error", error);
    }
};
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl font-bold">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add New</RouterLink>
            </div>
        </div>
        <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'UpdatedAt', '']">
            <!-- row 1 -->
            <tr v-for="(product, index) in adminProductStore.list" :key="index">
                <th>{{ product.name }}</th>
                <td>
                    <img :src="product.imageUrl" class="w-24" />
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                        {{ product.status }}
                    </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: product.productId } }" class="btn btn-warning">
                            <Edit class="w-5 fill-black"></Edit>
                        </RouterLink>
                        <button @click="removeProduct(product.productId)" class="btn btn-error">
                            <Trash class="w-5 fill-black"></Trash>
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
