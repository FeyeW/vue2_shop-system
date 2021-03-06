// 该文件专门用于创建整个应用的路由器
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/users/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cates from '../components/goods/Cates'
import Params from '../components/goods/Params'
import List from '../components/goods/List'
import Add from '../components/goods/Add'
import Order from '../components/order/Order'
import Report from '../components/report/Report'

Vue.use(Router);
//创建并暴露一个路由器
const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/users',
                    component: Users
                },
                {
                    path: '/rights',
                    component: Rights
                },
                {
                    path: '/roles',
                    component: Roles
                },
                {
                    path: '/categories',
                    component: Cates
                },
                {
                    path: '/params',
                    component: Params
                },
                {
                    path: '/goods',
                    component: List
                },
                {
                    path: '/goods/add',
                    component: Add
                },
                {
                    path: '/orders',
                    component: Order
                },
                {
                    path: '/reports',
                    component: Report
                }
            ]
        }
    ],
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router