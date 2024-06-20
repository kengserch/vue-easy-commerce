<script setup>
//config
import {RouterLink} from 'vue-router'
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//component
import Table from "@/components/Table.vue";
//store
import { useAdminOrderStore } from "@/stores/admin/order";

const adminOrderStore = useAdminOrderStore()


</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl font-bold">Order</div>
        </div>
        <Table :headers="['Customer Name', 'Price', 'Status', 'UpdatedAt', '']"> 
            <tr v-for="(order,index) in adminOrderStore.list" :key="index">
                <td>{{order.customerName}}</td>
                <td>{{order.totalPrice}}</td>
                <td>{{order.status}}</td>
                <td>{{order.updatedAt}}</td>
                <td>
                    <RouterLink :to="{name:'admin-orders-detail', params: { id: index }}" class="btn">See detail</RouterLink>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
