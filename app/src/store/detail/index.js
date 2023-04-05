// 商品详情的仓库

import { reqGoodsInfo } from "@/api";

const state = {
    goodsInfo: {}
}

const actions = {
    // 获取产品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        console.log("商品详情数据：\n", result);
        if (result.code == 200) {
            commit('GET_GOODS_INFO', result.data)
        }
    }
}

const mutations = {
    GET_GOODS_INFO(state, goodsInfo) {
        state.goodInfo = goodsInfo
    }
}

// 简化数据
const getters = {
    categoryView(state) {
        // 当前计算出来的属性值至少是一个空对象
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo?.skuInfo || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}