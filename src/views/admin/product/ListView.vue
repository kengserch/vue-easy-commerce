<script setup>
//config
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
//layout
import AdminLayout from '@/layouts/AdminLayout.vue'
//component
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'
//store
import { useAdminProductStore } from '@/stores/admin/product'

const currentPage = ref(1)

const adminProductStore = useAdminProductStore()

onMounted(async () => {
    await adminProductStore.loadProducts()
})

const searchProduct = async () => {
    await adminProductStore.loadProducts()
}

const changeStatusFilter = async (newStatus) => {
    adminProductStore.filter.status = newStatus
    await adminProductStore.loadProducts()
}

const changeSortUpdateAt = async (newSort) => {
    adminProductStore.filter.sort.updatedAt = newSort
    await adminProductStore.loadProducts()
}

const changePage = async (newPage) => {
    if (newPage < currentPage.value) {
        //ย้อนกลับ
        await adminProductStore.loadNextProduct('previous')
    } else if (newPage > currentPage.value) {
        //ไปข้างหน้า
        await adminProductStore.loadNextProduct('next')
    }
    currentPage.value = newPage
}

const removeProduct = async (index) => {
    try {
        await adminProductStore.removeProduct(index)
        await adminProductStore.loadProducts()
    } catch (error) {
        console.log('error', error)
    }
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
        <div class="flex gap-4 justify-center items-end my-4">
            <div class="flex-1">
                <input v-model="adminProductStore.filter.search" type="text" placeholder="Type here" class="input input-bordered w-full" />
            </div>
            <div class="justify-self-center">
                <div>Updated At</div>
                <div class="join">
                    <button @click="changeSortUpdateAt('asc')" class="btn join-item" :class="adminProductStore.filter.sort.updatedAt === 'asc' ? 'btn-active' : ''">ASC</button>
                    <button @click="changeSortUpdateAt('desc')" class="btn join-item" :class="adminProductStore.filter.sort.updatedAt === 'desc' ? 'btn-active' : ''">DESC</button>
                </div>
            </div>
            <div class="justify-self-center">
                <div>Status</div>
                <div class="join">
                    <button @click="changeStatusFilter('open')" class="btn join-item" :class="adminProductStore.filter.status === 'open' ? 'btn-active' : ''">OPEN</button>
                    <button @click="changeStatusFilter('close')" class="btn join-item" :class="adminProductStore.filter.status === 'close' ? 'btn-active' : ''">CLOSE</button>
                </div>
            </div>
            <div class="flex-1">
                <button @click="searchProduct()" class="btn">Search</button>
            </div>
        </div>
        <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'UpdatedAt', '']">
            <!-- row 1 -->
            <tr v-for="(product, index) in adminProductStore.lists" :key="index">
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
        <Pagination :activePage="currentPage" :maxPage="adminProductStore.totalPage" :changePage="changePage"></Pagination>
    </AdminLayout>
</template>
