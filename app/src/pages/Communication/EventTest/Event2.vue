<template>
    <div>
        <h2>Event2组件</h2>
        <button @click="$emit('click', 'Evemt2自定义事件click')">分发自定义click事件</button> <br>
        <button @click="$emit('xxx', 'Evemt2自定义事件xxx')"> 分发自定义xxx事件 </button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    div {
        background: rgb(207, 205, 205);
        height: 100px;
    }
</style>