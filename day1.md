1:vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules:项目依赖

public:一般放置静资源（图片），需要注意：放在public文件夹中的静态资源，webpack进行打包的时候，会原封不懂打包到dist文件中

src：源代码文件夹
    assets：一般也是放置静态资源，一般放置多个组件公用的静态资源，需要注意：放置在assets里面的静态资源，在webpack进行打包的时候，会当做一个模块，打包进JS文件里面
    
    components：一般放置非路由组件，或者常用的全局组件

    App.vue: 唯一的根组件，Vue当中的组件

    main.js:程序的入口文件，也是整个程序中最先执行的文件

babel.config.js:配置文件，babel相关

package.json:认为是项目的身份证，记录项目叫什么、项目当中由哪些依赖、项目怎么运行

package-lock.json：缓存性的文件

README.md：项目说明性的文件

2:项目的其他配置
2.1.项目运行起来的时候，让浏览器自动化打开
---package.js
     "scripts": {
        "serve": "vue-cli-service serve --open", //设置浏览器自动打开
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },

2.2.eslint校验功能关闭
--- 在根目录下vue.config.js

2.3.src文件价的简写方法,配置别名@
jsconfig.json配置别名@提示 [@代表的是src文件夹，这样姜磊文件过多，找的时候方便很多]
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": ['src/*'] // 给src起一个别名@
        }
    },
    "exclude": ['node_modules', 'dist'] // 在node_modules和dist里面不能使用这个别名
} 

3.项目路由分析
vue-router
前端所谓的路由：KV键值对
key：URL（地址栏的路由）
value：相应的路由组件

注意：项目是上、中、下结构

路由组件：
Home首页路由组件、Search路由组件、Login路由组件、Register路由组件
非路由组件：
Header：首页、搜索页
Footer：在首页、搜索页有，在登录页、注册页没有

4.完成非路由组件Header和Footer业务
在开发项目的时候：
1.书写静态页面（HTML+CSS）
2.拆分静态页面
3.获取服务器的数据动态展示
4.完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构+组件样式+组件资源
注意2：项目采用less样式，浏览器不识别less样式，需要通过less、less-loader(安装5版本,5版本太低了，目前使用11.1.0暂时也没发现问题)进行处理less，把less样式转换成css样式。浏览器才可以识别
注意3：如果想让组件识别less样式，需要在style标签上加上lang='less'

4.1、使用组件的步骤（非路由组件）
-创建或定义组件
-引入组件
-注册组件
-使用组件

5.路由组件的搭建
经分析,路由组件应该有4个：Home、Search、Login、Register
-components文件夹：经常放置的是非路由组件 共用全局组件
-pages | views文件夹：经常放路由文件夹

5.1.配置路由
项目当中配置的路由一般放置在router文件中
5.2.总结
路由组件与非路由组件的区别
1：路由组件一般放置在pages|views文件夹,非路由组件一般放置在components文件夹中 
2：路由组件一般需要在router文件中进行注册，使用的是路由组件名，非路由组件在使用的使用，一般都是以标签的形式使用
3：注册玩路由，不管是路由组件还是非路由组件，身上都有$route、$router属性

$route：一般获取路由信息，路径、query、params等
$router：一般进行编程式导航进行路由跳转 push、replace

5.3、路由的跳转
路由跳转的两种形式：
    1.声明式导航router-link、
    2.编程式导航push、replace
    
编程式导航:声明式导航能做的，编程式到岗也能做
但是编程式导航除了可以进行路由跳转，还可以做一些其他的一些业务逻辑

6.Footer组件的显示与隐藏
显示或隐藏组件:v-if|v-show
Footer组件：在Home、Search显示，在注册和登录的时候隐藏

6.1、可以根据组件身上的$route获取路由信息，通过路由路径判断Footer显示和隐藏.
6.2、配置路由的时候，可以给路由配置路由元信息【meta】，路由需要配置对象，他key不能瞎写



