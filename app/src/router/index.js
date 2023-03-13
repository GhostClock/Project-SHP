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
        },
        // Search
        {
            path: '/search',
            component: Search,
        },
        // Login
        {
            path: '/login',
            component: Login,
        },
        // Register
        {
            path: '/register',
            component: Register,
        },
        
        // 重定向，在项目跑起来的时候。访问/，立马让其定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})