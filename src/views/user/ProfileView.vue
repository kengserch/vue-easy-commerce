<script setup>
//config
import { ref, onMounted } from 'vue'
//layout
import UserLayout from '@/layouts/UserLayout.vue'
//store
import { useAccountStore } from '@/stores/account'
import { useEventStore } from '@/stores/event.js'
//firebase storage
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const accountStore = useAccountStore()
const eventStore = useEventStore()

const profileImageUrl = ref()
const email = ref('')
const fullname = ref('')

const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
        const uploadRef = storageRef(storage, `users/${accountStore.user.uid}/${file.name}`)
        const snapshot = await uploadBytes(uploadRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        profileImageUrl.value = downloadUrl
    }
}

const updateProfile = async () => {
    try {
        const profileData = {
            imageUrl: profileImageUrl.value,
            email: email.value,
            fullname: fullname.value,
        }
        await accountStore.updateProfile(profileData)
        eventStore.popupMessage('success', 'Update Profile Successful')
        setTimeout(function () {
            window.location.reload()
        }, 2000)
    } catch (error) {
        console.log('error', error)
        eventStore.popupMessage('error',error.message)
    }
}

onMounted(() => {
    const profileData = accountStore.profile
    profileImageUrl.value = profileData.imageUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
    fullname.value = profileData.fullname
    email.value = profileData.email
})
</script>

<template>
    <UserLayout>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-3">
            <div class="font-bold text-2xl">Your profile</div>
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                            <img :src="profileImageUrl" />
                        </div>
                    </div>
                    <input class="file-input file-input-bordered w-full mt-2" type="file" @change="handleFileUpload" />
                </div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Email..." class="input input-bordered w-full" :value="email" disabled />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="fullname" type="text" placeholder="Name..." class="input input-bordered w-full" />
                </label>
                <button @click="updateProfile" class="btn btn-neutral w-full mt-4">Update Profile</button>
            </div>
        </div>
    </UserLayout>
</template>
