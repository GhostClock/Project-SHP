// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
export default new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // x:滚动条在左边 y:滚动条在顶部
        return {x:0, y: 0}
    }
})