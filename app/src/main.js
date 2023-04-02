import Vue from 'vue'
import App from './App.vue'
// 三级联动--全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图组件--全局组件
import Carousel from '@/components/Carousel';
// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store';
// 引入mockServe.js --- mock数据
import './mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

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
  },
}).$mount('#app')
