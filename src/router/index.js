import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/user/HomeView.vue'

import CartView from '@/views/user/CartView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SearchView from '@/views/user/SearchView.vue'
import SuccessView from '@/views/user/SuccessView.vue'
import ProductDetail from '@/views/user/ProductDetail.vue'

import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'

import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    },
    /* admin site */
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/products',
      name: 'admin-product-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-product-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-product-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/users',
      name: 'admin-users-list',
      component: AdminUserList
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-user-update',
      component: AdminUserUpdate
    },
    {
      path: '/admin/orders',
      name: 'admin-order-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-order-update',
      component: AdminOrderDetail
    }
  ]
})

export default router
