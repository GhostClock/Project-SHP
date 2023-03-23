import Vue from 'vue'
import App from './App.vue'
// 三级联动--全局组件
import TypeNav from '@/components/TypeNav';
// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store';

new Vue({
  render: h => h(App),
  // 注册路由,router必须小写
  // 注册路由信息：当这里属性router的时候，组件身上都拥有，$route和$router属性
  router,
  // 注册仓库: 组件实例身上会多了一个属性，叫$store属性
  store,
}).$mount('#app')
