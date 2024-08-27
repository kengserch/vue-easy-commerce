import { defineStore } from "pinia";

import { ref, onValue, set } from 'firebase/database'
import { realtimeDB } from '@/firebase'

export const useEventStore = defineStore("event", {
    state: () => ({
        alert: false,
        data: {},
        banner: {}
    }),
    actions: {
        loadBanner(){
            const bannerRef = ref(realtimeDB,'banner')
            onValue(bannerRef, (snapshot) => {
                this.banner = snapshot.val()
            })
        },
        popupMessage(status, message) {
            this.alert = true
            this.data = {
                status, // = status:status
                message // = message:message
            }
            setTimeout(()=>{
                this.clearMessage()
            },3000)
        },
        clearMessage(){
            this.alert = false
            this.data = {}
        }
    },
});
