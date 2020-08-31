import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/app.css'
import '@/assets/css/icons.css'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueToast);
Vue.use(Vue2TouchEvents);

axios.defaults.baseURL = 'http://192.168.0.107:5000/api/';
axios.defaults.headers.common['Authorization'] = '';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
