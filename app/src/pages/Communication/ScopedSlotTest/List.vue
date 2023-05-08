<template>
    <ul>
        <li v-for="item in todos" :key="item.id"> 
            <!-- 作用域插槽 作用域插槽的语法规则 -->
            <slot :todo="item"></slot>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        todos: Array,
        default: []
    }
}
</script>
<style lang="">
    
</style>