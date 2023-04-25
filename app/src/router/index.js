// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push // 先把VueRouter原型对象的push，先保存一份
const originalReplaceh = VueRouter.prototype.replace

// 重写push方法
// 第一个参数：告诉原来push方法，你往哪里跳转(传递哪些参数)
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function push(location, resolve, reject) {
    if (resolve && reject) {
        // call与apply的区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数的区别，call:参数用逗号隔开 apply：方法执行，传递数组
        return originalPush.call(this, location, resolve, reject)
    }
    originalPush.call(this, location, () => {}, () => {})
}

// 重写replace方法
VueRouter.prototype.replace = function replace(location, resolve, reject) {
    if (resolve && reject) {
        return originalReplaceh.call(this, location, resolve, reject)
    }
    originalReplaceh.call(this, location, () => {}, () => {})
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // x:滚动条在左边 y:滚动条在顶部
        return {x:0, y: 0}
    }
})

// 全局守卫、全局前置守卫, 在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
    // to: 去哪个路由
    // from: 来自哪个路由
    // next: 放行的函数 写法：next()全放行  next(path)放行到指定的路由 next(false)中断当前导航

    // 用户登录为才有token，未登录一定不会有token
    let token = store.state.user.token
    if (token) {
        // 用户登录了
        if (to.path == '/login' || to.path == '/register') {
            // 已经登录了，就不能去登录页，直接回到首页,
            next('/home')
        } else {
            // 去的不是登录页 home search detail shopcart
            // 如果用户名已经有了，
            // 用户信息
            let name = store.state.user.userInfo.name
            if (name) {
                // 登录了，也有用户信息
                next()
            } else {
                // 登录了，没有用户信息
                try {
                    // 没有用户信息 派发action，让仓库存储用户信息再存储
                    await store.dispatch('userInfo')
                    // 放行
                    next()
                } catch (error) {
                    console.log(error.message);
                    // token过期了
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录: 不能去交易相关、不能去支付相关(pay、paysuccess)、不能去个人中心 --> 应该去登录页
        let topPath = to.path
        if (topPath.indexOf('/trade') != -1 ||
            topPath.indexOf('/pay') != -1 ||
            topPath.indexOf('/center') != -1) {
            // 重定向，登录后继续跳转到上一次想去的路由,存储与地址栏种【路由】
            next('/login?redirect=' + topPath)
            return
        }
        // 去的不是上面的路由，应该放行
        next()
    }
})

export default router