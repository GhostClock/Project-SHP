<template>
  <div>
    我是搜索
    <h1>params参数：{{ $route.params.keyword }}</h1>
    <h1>query参数：{{ $route.query.k }}</h1>
  </div>
</template>

<script>
    export default {
      // 路由组件是可以传递props
      props: ['keyword']
    }
</script>

<style>

</style>