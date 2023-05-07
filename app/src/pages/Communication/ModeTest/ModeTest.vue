<template>
  <div>
    <h2>深入v-mode</h2>
    <input type="text" v-model="msg" /> <span> {{ msg }} </span>

    <br />
    <hr />

    <h2>v-model实现的原理 :value事件 (Vue2)</h2>
    <!-- 
        原生的DOM当值当中oninput事件，经常结合表单元素一起使用，主要作用，当表单元素内容发生变化时触发一次回调
        Vue2中可以通过value与input事件实现v-model
     -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span> {{ msg }} </span>

    <hr />
    <!-- 深入学习v-model 父子组件数据同步 实现父子组件通信 -->
    <!-- 
      组件上的:value到底是什么？
        这是props，父子组件通信

      组件上@input=""到底是什么？
        并非原生DOM的input事件，属于自定义事件
     -->
    <CustomInput :value="msg" @input="msg = $event" />
    <CustomInput v-model="msg" />
  </div>
</template>
<script>
import CustomInput from "./CustomInput";
export default {
  name: "ModelTest",
  data() {
    return {
      msg: "Hello",
    };
  },
  components: {
    CustomInput,
  },
};
</script>
<style lang="">
</style>