<template>
  <div>
    <!-- 可以巧妙的利用a标签实现按钮带有提示功能 -->
    <a :title="title">
        <!-- 下面v-bind这种写法不能用: , 下面v-on不能用@进行替换 -->
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>
<script>
export default {
    props: ['title'],
    mounted() {
        // $attrs属于组件的一个属性，可以获取到父组件传递过来的props数据
        // 对于子组件而言，父组件给的数据可以利用pros接受，但是需要注意，如果子组件通过prop接受数据，$attrs属性当中是获取不到的
        console.log(this.$attrs);

        // $listeners 它也是组件实例自身的一个属性，它可以获取到父组件给子组件传递自定义事件
        console.log(this.$listeners);
    },
};
</script>
<style lang="">
</style>