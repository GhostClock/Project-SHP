
// 当前模块：对所有的API接口进行统一管理

import request from './request';
import mockRequest from './mockRequest';

// 三级联动的接口
// /api/product/getBaseCategoryList GET 无请求参数

// 发起请求: axios发起请求返回的结果式Promise对象
export const reqCategoryList = () => request.get(
    '/product/getBaseCategoryList'
)

// 获取banner数据
export const reqGetBannerList = () => mockRequest.get(
    '/banner'
)

// 获取floor数据
export const reqFloorList = () => mockRequest.get(
    '/floor'
)

// 获取搜索模块的数据  地址：/api/list 方式：POST 
/* 参数：
    {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
    }
*/
// 当前这个接口，传递的参数至少应该式一个空对象 {}
export const reqGetSearchInfo = (parmas) => request({
    url: "/list",
    method: "post",
    data: parmas
})

// 获取商品详情的接口 
// URL:/api/item/{ skuId } 
// GET
// skuId string
export const reqGoodsInfo = (skuId) => request({
    url: `item/${skuId}`, 
    method: 'get'
})

// 将产品添加到购物车中 或者 更新某一个产品的个数
// URL: /api/cart/addToCart/{ skuId }/{ skuNum }
// POST
// skuId	string	Y
// skuNum	string	Y
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({
    url: `cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表
// URL: /api/cart/cartList
// GET
export const reqCartList = () => request({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车商品
// URL: /api/cart/deleteCart/{skuId}
// DELETE
export const reqDeleteCartById = (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 切换商品选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}
// GET
export const reqUpdateCheckedById = (skuId, isChecked) => request({
    url: `cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码
// URL：/api/user/passport/sendCode/{phone}
// GET
export const reqGetCode = (phone) => request({
    url: `user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册用户
// URL：/api/user/passport/register
// phone	string	Y
// password	string	Y
// code	string	Y
// POST
export const reqUserRegister = (data) => request({
    url: '/user/passport/register',
    data,
    method: 'post'
})

// 用户登录
// URL: /api/user/passport/login
// phone	string
// password	string
// POST
export const reqUserLogin = (data) => request({
    url: '/user/passport/login',
    data,
    method: 'post'
})

// 获取用户信息 带token向服务器获取信息
// URL: api/user/passport/auth/getUserInfo
// GET
export const reqUserInfo = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

