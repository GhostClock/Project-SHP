// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 配置路由
export default new VueRouter({
    routes: [
        // Home
        {
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        // Search
        {
            path: '/search/:keyword?',// parmas参数，用来占位，?表示可传可不传
            component: Search,
            name: 'Search',
            meta: {
                show: true
            },
            // 路由组件能不能传递props数据？
            // 布尔值的写法,只能传递parmas参数
            // props: true,
            // 对象写法:额外的给路由传递一些props
            // props: {a: 111, b: 222}
            // 函数写法：可以传递parmas参数、query参数，通过props传递给路由组件
            // props: ($route) => {
            //     return {keyword: $route.params.keyword, k: $route.query.k}
            // },
            // 函数写法的简写形式
            props: ($routes) => ({...$routes.params, ...$routes.query})
        },
        // Login
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        // Register
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        
        // 重定向，在项目跑起来的时候。访问/，立马让其定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})