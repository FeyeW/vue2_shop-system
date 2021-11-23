//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import router from './router/index'

import './assets/fonts/iconfont'
import '../public/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

//关闭Vue的生产提示
Vue.config.productionTip = false


//创建vm
new Vue({
    router,
    el: '#app',
    render: h => h(App),
})