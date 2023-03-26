复习：
1.完成商品分类的路由跳转，路由传参 合并参数
2.完成Search模块中对于TypeNav的使用 有过度动画
3.对于TypeNav请求次数的优化 放在根组件App
4.Swiper插件的使用
Swiper插件：经常制作轮播图 移动端|PC端都可以使用
使用步骤：
1.使用相应的依赖包 Swiper.js swiper.css
2.页面种的结构务必要有
3.初始化Swiper，给轮播图添加动态效果
5.mock数据：使用mockjs模块实现


1.最完美的解决方案，解决轮播图的问题
watch + $nextTick：数据监听 监听已有数据的变化
$nextTick：在下次DOM更新 循环结束之后 执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM
$nextTick：可以保证页面结构一定是有的，经常和很多插件一起使用【都需要DOM存在的】

2.开发floor组件
state里面的数据格式一定要和服务器返回的一样
2.1.getFloorList在哪里触发？
是需要在Home路由组件当中触发，不能在Floor组件内部触发action
因为我们需要v-for遍历Floor组件

2.2.v-for也可以在自定义标签当值使用
2.3.组件通信的方式有哪些? 面试频率极高
props: 用于父子组件通信
自定义事件：$on @emit 可以实现子组件给父组件通信
全局事件总线：$bus 全能
pubsub-js：vue中几乎不用 全能
插槽
vuex


