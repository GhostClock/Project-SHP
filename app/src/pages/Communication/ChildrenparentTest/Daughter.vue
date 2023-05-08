<template>
  <div>
    <h3>女儿小红：有存储：{{ money }}</h3>
    <button @click="giveMoney(100)">给爸爸借钱：100</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: 20000,
    };
  },
  methods: {
    giveMoney(money) {
      // 女儿钱减少50
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