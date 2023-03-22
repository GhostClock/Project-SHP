
// 当前模块：对所有的API接口进行统一管理

import request from './request';

// 三级联动的接口
// /api/product/getBaseCategoryList GET 无请求参数

// 发起请求: axios发起请求返回的结果式Promise对象
export const reqCategoryList = () => request({url: '/product/getBaseCategoryList',  method: 'get'})