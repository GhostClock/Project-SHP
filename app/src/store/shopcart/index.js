
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';

const state = {
    cartList: []
}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log("购物车列表数据: ", result);
        if (result.code == 200) {
            commit('GET_CART_LIST', result.data)
        }
    },
    // 删除某一个商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        console.log("删除产品数据: ", result);
        // 返回的是Promise
        if (result.code == 200) {
            console.log("删除产品成功");
            return true
        }
        console.log("删除产品失败");
        return Promise.reject(new Error('删除产品失败'))
    },
    // 修改购物车某个产品的状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        console.log("修改购物车产品的状态: ", result);
        if (result.code == 200) {
            console.log("修改购物车产品的状态成功");
            return true
        }
        console.log("修改购物车产品的状态失败");
        return Promise.reject(new Error('修改购物车产品的状态失败'))
    },
    // 删除全部勾选的产品
    deletaAllCheckedCart({ dispatch, getters }) {
        // context： 小仓库，context里面有commit，dispatch，getters、state
        // commit： 提交mutations修改state
        // getter：计算属性
        // state：当前仓库数据
        // 获取购物车种全部的产品
        let promiseAll = []
        getters.cartInfoList.forEach(cart => {
            // 删除勾选的
            let promise = cart.isChecked == 1 ? dispatch('deleteCartListBySkuId', cart.skuId) : ''
            // 将每次返回的Promise否存放在数组种
            promiseAll.push(promise)
        });
        // 只要全部promise都成功返回成功，如果有一个失败，即为失败
        return Promise.all(promiseAll)
    },
    // 修改全部产品的状态
    updataAllCartIsChecked({ dispatch, getters }, isChecked) {
        let promiseAll = []
        getters.cartInfoList.forEach(cart => {
            let promise = dispatch('updateCheckedById', {skuId: cart.skuId, isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GET_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // 真正购物车里面的数据
    cartInfoList(state) {
        return state.cartList[0]?.cartInfoList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}