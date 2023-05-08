<template>
  <div>
    小明的爸爸现在有 {{ money }} 元

    <h2>不使用sync修饰符</h2>
    <!-- 
        :money 父组件给子组件传递props
        @update:money 给子组件绑定的自定义事件，只不过名字叫做update:money
        目前现在这种操作，起始和v-model很想。可以实现父子组件数据同步
    -->
    <Chind1 :money="money" @update:money="money = $event" />

    <h2>使用sync修饰符</h2>
    <!-- 
        :money.sync 
        第一：父组件给子组件传递了props money
        第二：给当前子组件绑定了自定义事件，而且事件的名称为 update:money
     -->
    <Chind2 :money.sync="money"/>

    <hr />
  </div>
</template>
<script>
import Chind1 from "./Chind1.vue";
import Chind2 from "./Chind2.vue";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 10000,
    };
  },
  components: {
    Chind1,
    Chind2,
  },
};
</script>
<style lang="less">
</style>