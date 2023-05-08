<template>
    <div>
        <h2>爸爸有存款：{{ money }}</h2>
        <button @click="jieqianFromXM(100)">找小明借钱100</button><br>
        <button @click="jieqianFromXH(150)">找小红借钱150</button><br>
        <button @click="jieqianFromAll(200)">找所有还是借钱200</button>
        <br><br>
        <!-- ref: 可以获取结点 组件标签 -->
        <!-- 在Vue组件中可以通过ref获取子组件, 就可以操作子组件的数据和方法 -->
        <Son ref="xm" />
        <br>
        <Daughter ref="xh" />
    </div>
</template>
<script>
import Daughter from "./Daughter";
import Son from "./Son";
export default {
  components: {
    Daughter,
    Son,
  },
  data() {
    return {
      money: 1000,
    };
  },
  methods: {
    // 向小明借钱
    jieqianFromXM(money) {
        // 父组件的钱数累加100元
        this.money += money
        // ref可以获取到真实的DOM结点，也可以获取子组件标签，可以操作子组件的数据和方法
        this.$refs.xm.money -= money
    },
    // 向小红借钱
    jieqianFromXH(money) {
        this.money += money
        this.$refs.xh.money -= money
    },
    // 找全部孩子借钱200
    jieqianFromAll(money) {
        this.money += 2 * money

        // 组件实例自身拥有一个属性 $children，可以获取当前组件中，全部子组件
        this.$children.forEach(item => {
            item.money -= 200
        })

        // 切记别这样写 如果子组件过多，第0项数据，可能不是小明
        // this.$children[0].money -= 200
        // this.$children[1].money -= 200
    }
  },
};
</script>
<style lang="">
</style>