<script setup>
//config
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
//layout
import AdminLayout from "@/layouts/AdminLayout.vue";
//store
import { useAdminProductStore } from "@/stores/admin/product";

const formData = [
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Image",
        field: "imageUrl",
    },
    {
        name: "Price",
        field: "price",
    },
    {
        name: "Quantity",
        field: "quantity",
    },
    {
        name: "About",
        field: "about",
    },
];

const adminProductStore = useAdminProductStore();
const router = useRouter();
const route = useRoute();

const productIndex = ref(-1);
const mode = ref("ADD");

const productData = reactive({
    name: "",
    imageUrl: "",
    price: 0,
    quantity: 0,
    about: "",
    status: "",
});
const updateProduct = async () => {
    try {
        if (mode.value === "EDIT") {
            await adminProductStore.updateProduct(productIndex.value, productData);
        } else {
            //console.log(productData)
            await adminProductStore.addProduct(productData);
        }
        router.push({ name: "admin-products-list" });
    } catch (error) {
        console.log('error',error)
    }
};

onMounted(async () => {
    if (route.params.id) {
        mode.value = "EDIT";

        productIndex.value = route.params.id;
        const selectedProduct = await adminProductStore.getProduct(productIndex.value);
        // console.log('selectedProduct',selectedProduct)
        productData.name = selectedProduct.name;
        productData.imageUrl = selectedProduct.imageUrl;
        productData.price = selectedProduct.price;
        productData.quantity = selectedProduct.quantity;
        productData.about = selectedProduct.about;
        productData.status = selectedProduct.status;
    }
});
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4">
            <div class="text-1xl font-bold">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-5">
                <label v-for="form in formData" :key="form.name" class="form-control w-full">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input type="text" :placeholder="form.field" class="input input-bordered w-full" v-model="productData[form.field]" />
                </label>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-5">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>
                    <select v-model="productData.status" class="select select-bordered">
                        <option disabled selected>Choose status</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                </label>
            </div>
            <div class="mt-4 flex justify-end gap-2">
                <RouterLink :to="{ name: 'admin-products-list' }" class="btn btn-outline">Back</RouterLink>
                <button class="btn btn-neutral" @click="updateProduct">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>
</template>
