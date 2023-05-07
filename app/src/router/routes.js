// 配置路由信息
/*
路由懒加载
当打包构建时，JS打包会变得非常大，影响页面加载
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
这样就更加高效了
*/
// 配置路由信息
export default [
    // Home 主页
    {
        path: '/home',
        component: () => import('@/pages/Home'), // 路由懒加载
        meta: {
            show: true
        }
    },
    // Search 搜索
    {
        path: '/search/:keyword?',// parmas参数，用来占位，?表示可传可不传
        component: () => import('@/pages/Search'),
        name: 'Search',
        meta: {
            show: true
        },
        // 路由组件能不能传递props数据？
        // 布尔值的写法,只能传递parmas参数
        // props: true,
        // 对象写法:额外的给路由传递一些props
        // props: {a: 111, b: 222}
        // 函数写法：可以传递parmas参数、query参数，通过props传递给路由组件
        // props: ($route) => {
        //     return {keyword: $route.params.keyword, k: $route.query.k}
        // },
        // 函数写法的简写形式
        props: ($routes) => ({ ...$routes.params, ...$routes.query })
    },
    // Login 登录
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    // Register 注册
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    // Detail 商品详情
    {
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    // AddCartSuccess 添加到购物车成功
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: () => import("@/pages/AddCartSuccess"),
        meta: {
            show: true
        }
    },
    // ShopCart 购物车
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    // Trade 订单页
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            isShow: true
        },
        // 路由独享守卫
        beforeEnter(to, from, next) {
            // 去交易页，必须是从购物车(shopcart)过来
            if (from.path == '/shopcart') {
                next()
                return
            }
            // 非购物车过来，停留在当前页
            // next(false):中断当前的导航，如果浏览器的URL改变了（可能用户手动输入、也可能浏览器后退按钮），那么URL地址会重置到from路由对应的地址
            next(false)
        }
    },
    // Pay 支付
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            // 去支付页，必须从订单页(trade)而来
            if (from.path == '/trade') {
                next()
                return
            }
            next(false)
        }
    },
    // PaySuccess 支付成功
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            isShow: true
        },
    },
    // Center 个人中心
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            isShow: true
        },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/GroupOrder')
            },
            // 设置二级路由的重定向
            {   
                path: '/center',
                redirect: '/center/myorder'
            }
        ],
    },

    // 组件间通信 高级技巧
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children:[
            {
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isHideFooter: true
                }
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModeTest/ModeTest'),
                meta: {
                    isHideFooter: true
                }
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isHideFooter: true
                }
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isHideFooter: true
                }
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenparentTest/ChildrenparentTest'),
                meta: {
                    isHideFooter: true
                }
            },
            {
                path: 'scoped-slot',
                component: () => import('@/pages/Communication/ScopedSlotTest/ScopedSlotTest'),
                meta: {
                    isHideFooter: true
                }
            },
        ]
    },
    // 重定向，在项目跑起来的时候。访问/，立马让其定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]