<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
const menus = [
    {
        name: "Dashboard",
        routeName: "admin-dashboard",
    },
    {
        name: "User",
        routeName: "admin-users-list",
    },
    {
        name: "Product",
        routeName: "admin-products-list",
    },
    {
        name: "Order",
        routeName: "admin-orders-list",
    },
];
const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const activeMenu = ref("");
onMounted(() => {
    activeMenu.value = route.name;
});

const logout = async () => {
    try {
        await accountStore.logout();
        router.push({name:'login'})
    } catch (error) {
        console.log("error", error);
    }
};
</script>

<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-4">
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <li class="text-3xl font-bold">
                    <a>Back office</a>
                </li>
                <li v-for="menu in menus" :key="menu.name">
                    <RouterLink :class="activeMenu === menu.routeName ? 'active' : ''" :to="{ name: menu.routeName }">
                        {{ menu.name }}
                    </RouterLink>
                </li>
                <li>
                    <a @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>
