// Search模块的小仓库
import {reqGetSearchInfo} from '@/api';

const state = {
    // 搜索页面的数据
    searchList: {}
}

const actions = {
    // 获取Search模块的数据
    async getSearchList({commit}, parmas = {}) {
        // 当前这个函数，在调用获取服务器数据的时候，至少传递一个参数，空对象{}
        // parmas形参：当用户派发action的时候，第二个参数传递过来，至少是一个空对象
        const result = await reqGetSearchInfo(parmas)
        console.log('搜索页面的数据：', result);
        if (result.code == 200) {
            commit('GET_SEARCH_LIST', result.data)
        }
    }
}

const mutations = {
    GET_SEARCH_LIST(state, searchList) {
        state.searchList = searchList
    }
}

// 计算属性，
// 在项目中主要的作用，为了简化仓库中数据而生 
// 可把将要在组件中需要用的数据简化一下【将来在组件中使用数据的时候就方便了】
const getters = {
    // 当前state，是当前仓库中的state，并非是大仓库中的state
    goodsList(state) {
        // 如果服务数据回来了，没问题
        // 如果网络差 或者没网，应该返回undefined
        // 数据对象至少得是一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}