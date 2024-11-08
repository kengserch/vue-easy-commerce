import { defineStore } from "pinia";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const useAdminUserStore = defineStore("admin-user", {
    state: () => ({
        list: [],
    }),
    actions: {
        async loadUser() {
            const userCol = collection(db, 'users');
            const userSnapShot = await getDocs(userCol);
            const userList = userSnapShot.docs.map((doc) => {
                let convertedUser = doc.data();
                //console.log(convertedUser)
                convertedUser.uid = doc.id;
                convertedUser.updatedAt = convertedUser.updatedAt.toDate();
                return convertedUser;
            });
            this.list = userList;
            //console.log(userList)
            // userSnapShot.docs
        },
        async getUser(uid) {
            try {
                const userRef = doc(db, 'users', uid);
                const userSnapShot = await getDoc(userRef);
                return userSnapShot.data();
            } catch (error) {
                console.log('error', error);
            }
        },
        async updateUser(uid, userData) {
            try {
                const updatedUser = {
                    fullname: userData.fullname,
                    status: userData.status,
                    role: userData.role,
                    updatedAt: new Date(),
                };
                const docRef = doc(db, 'users', uid);
                await setDoc(docRef, updatedUser);
            } catch (error) {
                console.log('error', error);
            }
        },
    },
});
