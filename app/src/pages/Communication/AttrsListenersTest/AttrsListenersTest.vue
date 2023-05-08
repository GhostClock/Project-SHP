<template>
  <div>
    <h2>自定义Hover提示的按钮</h2>
    <!-- 
        当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数 
        对el-button进行了二次封装
    -->
    <!--  @click是一个自定义事件 -->
    <HintButton
      type="success"
      icon="el-icon-delete"
      size="mini"
      title="提示按钮"
      @click="handler"
    />
  </div>
</template>
<script>
import HintButton from "./HintButton";
export default {
  components: {
    HintButton,
  },
  methods: {
    // 点击事件
    handler() {
        alert(666)
    }
  },
};
</script>
<style lang="">
</style>