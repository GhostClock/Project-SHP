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