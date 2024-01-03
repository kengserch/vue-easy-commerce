import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list:[
      {
        name: 'test',
        imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        quantity: 10,
        about: 'test1',
        status: 'open',
        price: 100,
      },
      {
        name: 'test 123',
        imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        quantity: 20,
        about: 'Recheck for detail',
        status: 'open',
        price: 100,
      }
    ]
  }),
  actions: {
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})
