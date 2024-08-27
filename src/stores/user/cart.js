import { defineStore } from 'pinia'

import axios from 'axios'

import { doc, getDoc } from 'firebase/firestore'
import { ref, onValue, set } from 'firebase/database'
import { db, realtimeDB } from '@/firebase'

import { useAccountStore } from '@/stores/account'

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)

// เพื่อ function createSource
const createSource = (amount) => {
    return new Promise((resolve, reject) => {
        // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
        Omise.createSource(
            'rabbit_linepay',
            {
                amount: amount * 100,
                currency: 'THB',
            },
            (statusCode, response) => {
                if (statusCode !== 200) {
                    return reject(response)
                }
                resolve(response)
            }
        )
    })
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        checkout: {},
    }),
    getters: {
        summaryQuantity(state) {
            return state.items.reduce((acc, item) => acc + item.quantity, 0)
        },
        summaryPrice(state) {
            return state.items.reduce((acc, item) => {
                return acc + item.price * item.quantity
            }, 0)
        },
        user(state) {
            const accountStore = useAccountStore()
            return accountStore.user
        },
        cartRef(state) {
            return ref(realtimeDB, `carts/${this.user.uid}`)
        },
    },
    actions: {
        async loadCart() {
            // console.log('cart user', this.user)
            if (this.user.uid) {
                onValue(
                    this.cartRef,
                    (snapshot) => {
                        const data = snapshot.val()
                        if (data) {
                            this.items = data
                        }
                    },
                    (err) => {
                        console.log('error', err)
                    }
                )
            } else {
                const previousCart = localStorage.getItem('cart-data')
                if (previousCart) {
                    this.items = JSON.parse(previousCart)
                }
            }
        },
        async addToCart(ProductData) {
            const findProductIndex = this.items.findIndex((item) => {
                return item.name === ProductData.name
            })
            if (findProductIndex < 0) {
                ProductData.quantity = 1
                this.items.push(ProductData)
            } else {
                const currentItem = this.items[findProductIndex]
                this.updateQuantity(findProductIndex, currentItem.quantity + 1)
            }
            await set(this.cartRef, this.items)
            //localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        async updateQuantity(index, quantity) {
            this.items[index].quantity = quantity
            await set(this.cartRef, this.items)
            //localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        async removeItemIncart(index) {
            this.items.splice(index, 1)
            await set(this.cartRef, this.items)
            //localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        async placeOrder(userData) {
            try {
                const checkoutData = {
                    ...userData,
                    products: this.items.map((product) => ({
                        productId: product.productId,
                        quantity: product.quantity,
                    })),
                }

                const omiseResponse = await createSource(this.summaryPrice)
                console.log('omiseResponse', omiseResponse)

                const response = await axios.post('/api/placeorder', {
                    source: omiseResponse.id, // omise source token
                    checkout: checkoutData,
                })
                //console.log('response', response.data)

                return response.data

                // localStorage.setItem('order-data', JSON.stringify(orderData))
            } catch (error) {
                console.log('error', error)
            }
        },
        async loadCheckout(orderId) {
            try {
                const orderRef = doc(db, 'orders', orderId)
                const orderSnapshot = await getDoc(orderRef)
                let orderData = orderSnapshot.data()
                orderData.createdAt = orderData.createdAt.toDate()
                orderData.orderNumber = orderSnapshot.id
                console.log('orderData', orderData)
                if (orderData.status === 'failed') {
                    throw new Error('Status Failed')
                }
                return orderData
            } catch (error) {
                throw new Error(error.message)
                console.log('error', error)
            }
        },
    },
})
