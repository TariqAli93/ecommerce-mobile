import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'


import './registerServiceWorker'


import router from './router'
import store from './store'


import axios from 'axios'
import VueAxios from 'vue-axios'
import server from './plugins/server'


import { Plugins } from '@capacitor/core'
const { SplashScreen } = Plugins

import '@/app.css'
import '@/assets/css/icons.css'


import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'


import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import MainLayout from './components/Layout/MainLayout'

import ProductDialog from './components/ProductDialog'

import { VueHammer } from 'vue2-hammer'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueToast);
Vue.use(VueHammer)

axios.defaults.baseURL = `${server}/api/`;
axios.defaults.headers.common['Authorization'] = '';

Vue.component('MainLayout',MainLayout);
Vue.component('ProductDialog',ProductDialog);

new Vue({
  router,
  store,
  mounted() {
    SplashScreen.hide()
  },
  render: h => h(App)
}).$mount('#app')
