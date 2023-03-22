1.编程式路跳转当前路由(参数不变)，多次执行会抛出NavigateDuplicated的警告错误
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航是没有这个问题的，因为vue-router底层已经处理好了
1.1.为什么编程式导航进行路由跳转的时候就有这种警告错误呢？
"vue-router": "^3.5.3"：最新的vue-router引入了Promise
1.2.通过给push方法传递相应的成功、失败的回调函数，就可以捕获到当前错误，可以解决
1.3.通过底下的代码，可以实现解决错误--治标不治本,将来在别的组件中push|replace，编程式导航还是有类似的错误
    ```
    this.$router.push({
        name: 'Search',
        params: {
        keyword: this.keyword,
        },
        query: {
        k: this.keyword.toUpperCase()
        },
    }, 
    () => {}, // 成功的回调
    (error) => {}, // 失败的回调
    )
    ```
1.4.
this:当前组件实例
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加的$router|$route属性
push:VueRouter类一个实例

2:Home模块组件拆分
--先把静态页面完成
--拆分出静态组件进行展示
--获取服务器的数据进行展示
--动态业务

3.三级联动组件完成
---由于三级联动，在Home、Search、Detail使用，把三级联动注册谓全组组件
好处：只需要注册一次，就可以在项目任意地方使用

4:其余的静态组件
HTML+ CSS + 图片资源 -- 细心【结构、样式、图片资源】