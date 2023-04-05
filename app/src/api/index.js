
// 当前模块：对所有的API接口进行统一管理

import request from './request';
import mockRequest from './mockRequest';

// 三级联动的接口
// /api/product/getBaseCategoryList GET 无请求参数

// 发起请求: axios发起请求返回的结果式Promise对象
export const reqCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取banner数据
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

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
export const reqGetSearchInfo =
    (parmas) => request({
        url: "/list",
        method: "post",
        data: parmas
    })

// 获取商品详情的接口 
// URL:/api/item/{ skuId } 
// GET
// skuId string
export const reqGoodsInfo = (skuId) => request({url: `item/${skuId}`, method: 'get'})



