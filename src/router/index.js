import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage'
import CartPage from '../views/CartPage'
import FavoritePage from '../views/FavoritePage'
import NotFound from '../views/NotFound'
import ProductsByStatus from '../views/ProductsByStatus'
import AllProducts from '../views/AllProducts'
import Product from '../views/Product'
import ProductsByCategory from '../views/ProductsByCategory'
import Categories from '../views/Categories'
import Profile from '../views/Profile'
import LoginPage from '../views/LoginPage'

import store from '../store'

Vue.use(VueRouter)

  function GuardTheRoute(to, from, next) {
    if(store.state.token === null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }

  function isAuthenticated(to, from, next) {
    if(store.state.token !== null) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }

  const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    beforeEnter: GuardTheRoute
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/favorite',
    name: 'FavoritePage',
    component: FavoritePage
  },
  {
    path: '/productsStatus/:id',
    name: 'ProductsByStatus',
    component: ProductsByStatus
  },
  {
    path: '/productsCategory/:id/:name',
    name: 'ProductsByCategory',
    component: ProductsByCategory
  },
  {
    path: '/products',
    name: 'AllProducts',
    component: AllProducts
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },

  {path: '*', component: NotFound}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
