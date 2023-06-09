
// 对于axios进行二次封装

import axios from 'axios';
// 引入nprogress进度条
import nprogress from 'nprogress';
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start:进度条开始 done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置以下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: '/mock',
    // 代表超时实践为5m
    timeout: 5000,
})

// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有个属性很重要，headers请求头
    // 进度条开始动
    nprogress.start()
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
    return Promise.reject(new Error('failed'))
})

// 对外暴露
export default requests