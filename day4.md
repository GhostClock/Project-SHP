复习：
1.商品分类的三级列表由静态变为动态形式 获取服务器数据：解决跨域问题
2.函数的防抖与节流 面试频率很高
3.路由的跳转：声明式导航(router-link)、编程式导航
编程式导航解决这个问题：标签的自定义属性

1.开发Search模块中的TypeNav商品分类的菜单 有过度动画
过度动画：前提组件或者元素务必要有v-if或者v-show才可以进行过度动画

2.现在商品三级列表很可以进行优化
在App组件种发起组件 【根组件mounted只执行一次】


3.合并参数
点击三级分类和搜索时进行query参数和parmas参数合并

4.开发Home首页当中的 ListContainer组件和Floor组件
但是这里需要知道：服务器返回的数据目前只有商品分类菜单，对于ListContainer组件和Floor组件是没有服务端数据的
https://docschina.org/ 印记中文
MOCK数据(模拟数据):如果想mock数据，需要用到一个插件 mockjs插件

mockjs使用步骤：
1.在项目当中的src创建一个src文件中创建一个mock文件夹
2.准备JSON数据(在mock文件夹种创建JSON文件)
3.把mock数据需要的图片放置到public文件夹种【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中】
4.创建mockServe.js，通过mockjs实现模拟数据
5.把mockServe.js在入口文件中引入 至少执行一次,才能模拟数据



