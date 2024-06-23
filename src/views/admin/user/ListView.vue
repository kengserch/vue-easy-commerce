<script setup>
//config
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//component
import Table from "@/components/Table.vue";

//store
import { useAdminUserStore } from "@/stores/admin/user";

const adminUserStore = useAdminUserStore()

onMounted( async () => {
   await adminUserStore.loadUser()
})

const changeStatus = (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(selectedUser)
}

</script>

<template>
    <AdminLayout> 
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl font-bold">User</div>
        </div>
        <Table :headers="['Name', 'Role', 'Status', 'UpdatedAt', '' ]">
            <tr v-for="(user,index) in adminUserStore.list" :key="index">
                <td>{{ user.fullname }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <div class="badge" :class="user.status === 'active' ? 'badge-success' : 'badge-error'">
                        {{ user.status }}
                    </div>
                </td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name : 'admin-users-update', params : {id : index }}" class="btn btn-outline">Edit</RouterLink>
                        <button class="btn" :class="user.status === 'active' ? 'btn-error' : 'btn-success' " @click="changeStatus(index)">
                           {{user.status === 'active' ? 'Disable' : 'Enable'}}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>