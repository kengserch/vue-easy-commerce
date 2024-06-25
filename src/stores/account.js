import { defineStore } from 'pinia'

import { signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
const provider = new GoogleAuthProvider()

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},
        profile: {},
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        this.user = user
                        console.log('user', this.user)
                        const docRef = doc(db, 'users', user.uid)
                        const docSnap = await getDoc(docRef)
                        if (docSnap.exists()) {
                            //ไม่สร้างข้อมูลใหม่
                            this.profile = docSnap.data()
                        } else {
                            //ยังไม่มีข้อมูล = สร้างใหม่
                            const newUser = {
                                fullname: user.displayName,
                                role: 'member',
                                status: 'active',
                                updatedAt: new Date(),
                            }
                            await setDoc(docRef, newUser)
                            this.profile = newUser
                        }
                        //console.log(this.profile)
                        if (this.profile.role === 'admin' || this.profile.role === 'moderator') {
                            this.isAdmin = true
                        }
                        this.isLoggedIn = true
                        this.profile.email = user.email
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
        },
        async updateProfile(userData) {
            try {
                const updateUserData = {
                    fullname: userData.fullname,
                    imageUrl: userData.imageUrl,
                }
                const userRef = doc(db, `users/${this.user.uid}`)
                await updateDoc(userRef, updateUserData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider)
                this.isLoggedIn = true
                this.user = result.user
            } catch (error) {
                console.log('error', error)
            }
        },
        async signInAdmin(email, password) {
            try {
                const result = await signInWithEmailAndPassword(auth, email, password)
                this.isLoggedIn = true
                this.isAdmin = true
                this.user = result.user
            } catch (error) {
                console.log(error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        throw new Error('Email ไม่ถูกต้อง')
                    case 'auth/wrong-password':
                        throw new Error('Password ไม่ถูกต้อง')
                    default:
                        throw new Error('มีปัญหาเกี่ยวกับการ Login')
                }
            }
        },
        async logout() {
            this.isLoggedIn = false
            this.isAdmin = false
            await signOut(auth)
        },
    },
})
