<template>
  <div id="app">
    <Header/>
    <!-- 路由组件出口 -->
    <router-view></router-view>

    <!-- Footer在Home、Search显示的、在登录、注册是隐藏的 -->
    <Footer 
      v-show="$route.meta.show">
    </Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  export default {
    name: 'App',
    components: {  
      Header,

      Footer,
     },
    mounted() {
      // 通知Vuex发请求，获取数据,存储与仓库中 存储在home仓库
      // 派发一个action，获取商品分类的三级列表的数据，
      this.$store.dispatch("categoryList");
    },
  }
</script>

