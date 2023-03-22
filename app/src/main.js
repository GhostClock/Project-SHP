import Vue from 'vue'
import App from './App.vue'
// 三级联动--全局组件
import TypeNav from '@/pages/Home/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)

// 引入路由
import router from '@/router'

import { reqCategoryList } from '@/api/';
reqCategoryList()

new Vue({
  render: h => h(App),
  // 注册路由,router必须小写
  // 注册路由信息：当这里属性router的时候，组件身上都拥有，$route和$router属性
  router,
}).$mount('#app')
