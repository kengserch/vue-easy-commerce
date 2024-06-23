<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account.js";
import { useEventStore } from "@/stores/event.js";


const router = useRouter();
const accountStore = useAccountStore();
const eventStore = useEventStore();

const email = ref("");
const password = ref("");

const login = async () => {
    try {
        await accountStore.signInAdmin(email.value, password.value);
        router.push({ name: "admin-dashboard" });
    } catch (error) {
        eventStore.popupMessage('error',error.message)
    }
};
</script>

<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-2xl">Login</h1>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="text" placeholder="Your email " class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input v-model="password" type="password" placeholder="Your password" class="input input-bordered w-full" />
                </label>
                <button @click="login" class="btn btn-neutral mt-4 w-full">Login</button>
            </div>
        </div>
    </div>
</template>
