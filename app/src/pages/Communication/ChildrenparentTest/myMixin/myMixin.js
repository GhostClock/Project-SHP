export default {
    // 对外暴露的对象，可以放置组件重复JS业务逻辑
    methods: {
        // 儿子给爸爸的钱的回调函数
        giveMoney(money) {
          // 儿子钱减少50
          this.money -= money;
          // 需要在子组件的内部获取父组件，让父组件数据记上50
          // 可以通过$parent属性获取某个组件的父组件，可以操作父组件的数据和方法
          this.$parent.money += money;
        },
    },
}