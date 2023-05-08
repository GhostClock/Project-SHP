<template>
  <div>
    <h1>组件间通信高级(** 非常重要，面试必备 **)</h1>
    <router-link to="/communication/event"> event深入 </router-link>
    <router-link to="/communication/model"> v-model深入 </router-link>
    <router-link to="/communication/sync"> 属性修饰符sync </router-link>
    <router-link to="/communication/attrs-listeners">
      $attr与$listeners
    </router-link>
    <router-link to="/communication/children-parent">
      $children与$parent
    </router-link>
    <router-link to="/communication/scoped-slot">
      作用域插槽scoped-slot
    </router-link>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
a {
  font-size: 20px;
  margin-left: 20px;
}
a:hover {
  color: rgb(0, 255, 110);
}
.content {
  padding-left: 20px;
}
.router-link-active {
  color: red;
}
</style>