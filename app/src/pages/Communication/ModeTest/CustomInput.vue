<template>
  <div>
    <h3>input包装组件</h3>
    <!-- 
        :value 动态的属性 
        @input 给原生DOM绑定原生DOM事件
    -->
    <input type="text" :value="value" @input="$emit('input', $event.target.value)"/>
  </div>
</template>
<script>
export default {
  name: "CustomInput",
  props: ["value"],
};
</script>
<style lang="less" scoped>
div {
  background: rgb(207, 205, 205);
  height: 80px;
}
</style>