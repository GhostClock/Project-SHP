
// 对于axios进行二次封装

import axios from 'axios';
// 引入nprogress进度条
import nprogress from 'nprogress';
// 在当前模块中引入store
import store from '@/store';
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start:进度条开始 done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置以下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: '/api',
    // 代表超时实践为5m
    timeout: 5000,
})

// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有个属性很重要，headers请求头
    // 进度条开始动
    nprogress.start()
    // 在拦截器里面增加游客临时身份，加在header里面
    let uuid_token = store.state.detail.uuid_token
    if (uuid_token) {
        // 在请求后里面加一个字段，
        config.headers.userTempId = uuid_token
    }
    // 需要判断携带token带给服务器
    let token = store.state.user.token
    if (token) {
        config.headers.token = token
    }
    return config
})

// 响应拦截器：
requests.interceptors.response.use((response) => {
    // 成功的回调函数：服务器响应的数据回来后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done()
    return response.data
}, (error) => {
    // 服务器响应失败的回调
    // 终止Promise链
    return Promise.reject(new Error(error.message))
})

// 对外暴露
export default requests