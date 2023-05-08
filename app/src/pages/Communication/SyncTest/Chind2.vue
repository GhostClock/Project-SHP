<template>
    <div>
        <span>小明每次花100元</span>
        <button @click="$emit('update:money', money-100)">花钱</button>
        爸爸还剩 {{ money }} 元
    </div>
</template>
<script>
export default {
    props:['money']
}
</script>
<style lang="less" scoped>
    div {
        background: #ccc;
        height: 50px;
    }
</style>