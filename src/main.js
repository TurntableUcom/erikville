import './firebase'

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store'

import '../index.html'
import './assets/css/base.css'
import './assets/css/fonts.css'
import './assets/css/main.css'
import './assets/css/vendor.css'

Vue.use(Vuelidate)
Vue.use(VueFire)

axios.defaults.baseURL = 'https://eric-blog-957a0.firebaseio.com/';
axios.defaults.headers.common['Authorization'] = 'AIzaSyCIz92jHPqVwASkepiB66Gn2q0_b89rd6Y';
axios.defaults.headers.get['Accepts'] = 'application/json';

/*
const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)
*/

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})