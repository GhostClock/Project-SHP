<template>
  <div>
    <h3>儿子小明：有存储：{{ money }}</h3>
    <button @click="giveMoney(50)">给爸爸借钱：50</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: 30000,
    };
  },
  methods: {
    // 儿子给爸爸的钱的回调函数
    giveMoney(money) {
      // 儿子钱减少50
      this.money -= money;
      // 需要在子组件的内部获取父组件，让父组件数据记上50
      // 可以通过$parent属性获取某个组件的父组件，可以操作父组件的数据和方法
      this.$parent.money += money;
    },
  },
};
</script>
<style lang="less" scoped>
div {
  background: #ccc;
  height: 50px;
}
</style>