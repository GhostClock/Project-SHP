<template>
  <div>
    <h3>儿子小明：有存储：{{ money }}</h3>
    <button @click="giveMoney(50)">给爸爸借钱：50</button>
  </div>
</template>
<script>
import MyMixin from './myMixin/myMixin'
export default {
  mixins: [MyMixin],
  data() {
    return {
      money: 30000,
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