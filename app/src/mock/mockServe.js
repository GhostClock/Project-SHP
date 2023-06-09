
// 先引入mockjs模块
import Mock from 'mockjs';
// 把JSON数据格式引入进来【没有对外暴露的JSON文件，也可以引入?为什么】
// webpack默认对外暴露有：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json';

// mock数据 第一个参数：请求地址 第二个参数：请求的数据
// 模拟首页大轮播图的数据
Mock.mock('/mock/banner',
    {
        code: 200,
        data: banner
    }
)
// 模拟首页楼层数据
Mock.mock('/mock/floor',
    {
        code: 200,
        data: floor
    }
)
