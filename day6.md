
复习
1.search模块需要的服务器数据，已经请求到，并且存储在vuex的search仓库中,而且有一些数组的数据，已经使用getter进行简化
切记：getter常用于简化数据
2.商品列表、平台售卖的属性，使用的是动态数据

1.动态开发面包屑中的分类名
    编程式导航路由 搜索跳搜索
2.动态开发面包屑中的关键字
2.1.当面包屑中的关键字清除后，需要让兄弟组件Header组件中的关键字也要清除
组件中通信方式：
props：父子
自定义组件事件：父子
vuex：万能
插槽：父子
pubsub-js：消息发布和订阅
$bus:全局事件总线

3.小重点 排序操作
1: 综合,2: 价格 asc: 升序,desc: 降序  
示例: "1:desc"
order属性的4种情况：
1:asc
1:desc 默认
2:asc
2:desc

3.2.考虑：谁应该有class？
默认是综合
通过order中包含1就是综合 2是价格
3.3.考虑，谁应该有降头
谁有类名，谁有剪头
3.4.

Tip:在package.json -> eslintConfig -> parserOptions 添加 配置项"requireConfigFile": false 可以解决首行报 parsing error no babel config file detected for vue的问题

Tip2:在package.json -> eslintConfig -> rules 添加配置项 "vue/multi-word-component-names": "off" 可以解决 component name pagination should always be multi-word 的问题

4.很多电商平台为什么要使用分页？
数据量大，一页显示不全
