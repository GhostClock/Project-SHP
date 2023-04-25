import Vue from 'vue'
import App from './App.vue'

// --------- 全局组件 ---------
// 三级联动--全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图组件--全局组件
import Carousel from '@/components/Carousel';
// 分页器 -- 全局组件
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// elementUI注册组件时，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// --------- 全局组件 ---------

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store';
// 引入mockServe.js --- mock数据
import './mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 统一接受api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'

// 引入插件
import VueLazyload from 'vue-lazyload'
// 引入图片资源
import lolita from '@/assets/lolita.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: lolita,
})

new Vue({
  render: h => h(App),
  // 注册路由,router必须小写
  // 注册路由信息：当这里属性router的时候，组件身上都拥有，$route和$router属性
  router,
  // 注册仓库: 组件实例身上会多了一个属性，叫$store属性
  store,
  // 配置全局事件总线 $bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
