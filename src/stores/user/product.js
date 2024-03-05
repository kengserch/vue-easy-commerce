import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list:[
      {
        id:1,
        name: 'Nike Air Force 1"07',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-force-1-07-WrLlWX.png',
        quantity: 1,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 3700,
      },
      {
        id:2,
        name: 'Air Jordan 1 Low',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1c0c434c-9802-4556-89c7-a8600b2828d8/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-jordan-1-low-6Q1tFM.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 4300,
      },
      {
        id:3,
        name: 'Nike Dunk Low Retro',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-dunk-low-retro-66RGqF.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 3700,
      },
      {
        id:4,
        name: 'Nike Zoom Vomero 5',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/305a75c4-b498-4d8c-a52d-0781dac1c0af/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-zoom-vomero-5-qZG4RJ.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 6000,
      },
      {
        id:5,
        name: 'Nike Dunk Low Retro',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cbe60d25-d7c7-4cd5-b9f1-d5440c0fb994/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-dunk-low-retro-66RGqF.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 3700,
      },
      {
        id:6,
        name: 'Nike Dunk Low Retro SE',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ac88ab75-d4bf-4be4-a654-498d9d42f196/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-dunk-low-retro-se-RSrHtr.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 4700,
      },
      {
        id:7,
        name: 'Nike P-6000',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb1addb3-4a0e-42b3-ba15-70ba134f2bd3/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2-p-6000-qx8GmG.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 4300,
      },
      {
        id:8,
        name: 'Jordan Spizike Low',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8105650c-249e-469f-aeef-fefcca2083a6/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-jordan-spizike-low-pBZk7c.png',
        quantity: 20,
        about: 'รองเท้าผู้ชาย',
        status: 'open',
        price: 6000,
      } 
    ]
  }),
  actions: {
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    },
    loadProduct (id){
      try {
        //this.selectedProduct = this.list.find(product => product.id == id)
        return this.list.find(product => product.id == id)
        //console.log(this.list.find(product => product.id == id))
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
