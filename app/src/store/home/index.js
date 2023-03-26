// Home模块的小仓库

import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const state = {
    // state中的默认初始值别瞎写，服务器返回的是什么格式就应该是什么格式
    // Home页三级联动的数据
    categoryList: [],
    // Home页轮播图的数据
    bannerList: [],
    // Floor组件数据
    floorList: [],
}

const actions = {
    // 通过api接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}) {
        const result = await reqCategoryList()
        console.log("三级分类数据：\n", result);
        if (result.code == 200) {
            commit('CATEGORY_LIST', result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({commit}) {
        const result = await reqGetBannerList()
        console.log("首页轮播图数据：\n", result);
        if (result.code == 200) {
            commit('GET_BANNER_LIST', result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}) {
        const result = await reqFloorList()
        console.log("Floor组件的数据：\n", result);
        if (result.code == 200) {
            // 提交mutations
            commit('GET_FLOOR_LIST', result.data)
        }
    }
}

const mutations = {
    CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GET_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GET_FLOOR_LIST(state, floorList) {
        state.floorList = floorList
    },
}

// 计算属性
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}