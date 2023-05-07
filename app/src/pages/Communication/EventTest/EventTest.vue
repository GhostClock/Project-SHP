<template>
  <div>
    <h1>EventTest组件</h1>
    
    <!-- 系统事件 原生的DOM绑定系统事件 -->
    <button @click="handler">原生的DOM绑定原生的事件</button>

    <!-- Event1组件: Event1非原生DOM结点，而绑定的click事件并非原生DOM事件，而是自定义事件
            @click.native可以把自定义事件变成原生DOM事件，
            当前原生DOM click事件，实际上是给子组件的根节点绑定了单击事件,利用到了事件的委派
            -->
    <Event1 @click.native="handler1" />

    <!-- 下面的写法给原生DOM绑定自定义事件
        给原生DOM绑定自定义事件是没有意义的，是因为没办法触发$emit函数
     -->
    <button @xxx="handler2">原生绑定自定义事件</button>

    <br><br>
    <!-- 组件标签 -->
    <Event2 @click="handler3" @xxx='handler3' />

  </div>
</template>
<script>
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2,
  },
  methods: {
    // 原生DOMbutton的事件回调
    handler(event) {
      console.log("元素DOM点击事件", event);
    },
    // Event1组件的事件回调
    handler1(event) {
      console.log("Event1组件点击事件", event);
    },
    // 给元素DOM元素绑定自定义事件 -- 无意义 因为没办法触发$emit函数
    handler2() {

    },
    // event2的自定义事件 
    handler3(parmas) {
        console.log("Event2组件的自定义事件", parmas);
    },
    
  },
};
</script>
<style lang="">
</style>