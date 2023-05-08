<template>
  <div>
    <h3>女儿小红：有存储：{{ money }}</h3>
    <button @click="giveMoney(100)">给爸爸借钱：100</button>
  </div>
</template>
<script>
import MyMixin from './myMixin/myMixin'
export default {
  mixins: [MyMixin],
  data() {
    return {
      money: 20000,
    };
  },
};
</script>
<style lang="less" scoped>
div {
  background: #ccc;
  height: 50px;
}
</style>