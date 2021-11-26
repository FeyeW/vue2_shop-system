//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import router from './router/index'

import './assets/fonts/iconfont.css'
import '../public/css/global.css'
import TreeTabel from 'vue-table-with-tree-grid'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

Vue.component('tree-table', TreeTabel)
Vue.use(VueQuillEditor)

Vue.filter('dataFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//创建vm
new Vue({
    router,
    el: '#app',
    render: h => h(App),
})