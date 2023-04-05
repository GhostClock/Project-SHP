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
            commit('GET_GOODES_INFO', result.data)
        }
    }
}

const mutations = {
    GET_GOODES_INFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}