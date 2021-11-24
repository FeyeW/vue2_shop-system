//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import router from './router/index'

import './assets/fonts/iconfont.css'
import '../public/css/global.css'

import axios from 'axios'
//配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

//关闭Vue的生产提示
Vue.config.productionTip = false


//创建vm
new Vue({
    router,
    el: '#app',
    render: h => h(App),
})