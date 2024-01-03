import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items:[
            {
                name: 'test',
                imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
                quantity: 10,
                about: 'test1',
                status: 'open',
                price: 100,
                quantity:1
            }
        ]
    }),
    getters:{
        summaryQuantity(state) {
            return state.items.reduce((acc,item)=> acc + item.quantity, 0)
        },
        summaryPrice (state) {
            return state.items.reduce((acc,item) =>{
                return acc + (item.price*item.quantity)
            },0)
        }
    },
    actions:{
        addToCart (ProductData) {
            this.items.push(ProductData)
        },
        updateQuantity (index, quantity) {
            this.items[index].quantity = quantity
        },
        removeItemIncart (index) {
            this.items.splice(index,1)
        }
    }
})