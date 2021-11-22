// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'

import News from '../pages/News'
import Message from '../pages/Message'

import Detail from '../pages/Detail'

//创建并暴露一个路由器
export default new VueRouter({
    routes: [{

            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [{
                    path: 'news',
                    component: News,
                },
                {
                    path: 'message',
                    component: Message,
                    children: [{
                        name: 'xiangqing', //路由命名，简化路由命名
                        path: 'detail',
                        component: Detail,
                        //对象写法，将对象中的所有key-value都会以propos的形式传给Detail组件。
                        // props: { a: 1, b: 'hello' }

                        //布尔值写法 布尔值为真则将会将路由组件收到的所有props传给Detail组件(只能是params)
                        // props: true

                        //函数写法(只能是query写法)
                        props($route) {
                            return { id: $route.query.id, title: $route.query.title }
                        }
                    }]
                }
            ]
        }
    ]
})