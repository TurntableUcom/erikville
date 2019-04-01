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
import './assets/css/vendor.css'
import './assets/css/main.css'
import './assets/css/custom.css'

// var VueScrollTo = require('vue-scrollto');
// Vue.use(VueScrollTo)
Vue.use(Vuelidate)
Vue.use(VueFire)

axios.defaults.baseURL = 'https://eric-blog-957a0.firebaseio.com/';
// axios.defaults.headers.common['aut'] = 'AIzaSyCIz92jHPqVwASkepiB66Gn2q0_b89rd6Y';
axios.defaults.headers.get['Accepts'] = 'application/json';

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})