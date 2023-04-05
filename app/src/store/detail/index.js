// 商品详情的仓库

import { reqGoodsInfo } from "@/api";

const state = {
    goodInfo: {}
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
    GET_GOODS_INFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

// 简化数据
const getters = {
    // 路径导航数据  面包屑
    categoryView(state) {
        // 当前计算出来的属性值至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    // 商品信息数据
    skuInfo(state) {
        return state.goodInfo?.skuInfo || {}
    },
    // 商品售卖属性数据
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}