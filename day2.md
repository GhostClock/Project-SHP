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

5:使用postman测试接口数据
--接口：经过测试，接口没问题
    http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
--如果服务返回的code==200，表示数据返回成功
--整个项目，接口的前缀都有 /api 字样

6:axios的二次封装
6.1 为什么需要二次封装axios？
请求拦截器：在发请求之前可以处理一些业务
响应拦截器：当服务端数据返回后，可以处理一些事情

6.2在项目中经常有个api文件夹【axios】
接口中都带有 /api
baseURL: '/api'
6.3.如果axios基础不好，可以参考git和npm的文档

7.接口统一管理
项目很小：完全可以在组件生命周期函数中发起请求，
项目很大：axios.get('xxx')

7.1.存在跨域问题
什么是跨域问题：协议、域名、端口号不一致的请求，就会出现跨域问题

解决跨域问题：JSONP、 CROS、代理

8.NProgress的使用
// 引入nprogress进度条
import nprogress from 'nprogress';
// 引入进度条的样式
import 'nprogress/nprogress.css'
start:进度条开始 
done：进度条结束
进度条的颜色是可以修改的,修改样式即可

9.vuex状态管理库
9.1.vuex是什么？
vuex是官方提供的一个插件，状态管理库，集中式管理项目种组件共用的数据。
切记，并不是所有的项目都需要Vuex，如果项目小，就完全不需要，如果项目很大，组件很多，数据很多，数据维护很费劲，就得使用Vuex

state
actions
mutations
getters
modules

9.2.vuex基本使用
// state：仓库存储数据的地方
const state = {}

// actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
// 不能修改state
const actions = {}

// mutations：修改state的唯一手段
const mutations = {}

// getters: 理解为计算属性,用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露Store类的一个实例
export default  new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

9.3.vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块化开发
{
    home: {},
    search: {}
}

10.完成TypeNav三级联动展示数据业务


