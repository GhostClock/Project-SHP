<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input 
              type="checkbox" 
              name="chk_list" 
              :checked="cart.isChecked == 1" 
              @change="updateChecken(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @click="changeSkuNum('input', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum('plus', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 单价 x 个数 -->
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" 
          type="checkbox" 
          :checked="isAllChecked && cartInfoList.length > 0" 
          @change="updateAllCartChecked">
        <span>全选</span>
      </div> 
      <div class="option">
        <a @click="deletaAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle';
  import { mapGetters } from "vuex";
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods: {
      // 获取个人购物车数据
      getData() {
        this.$store.dispatch('getCartList')
      },
      // 修改某一个产品的个数
      // 防止异常操作，需要进行节流
      changeSkuNum:throttle(async function(type, disNum, cart) {
        // type:类型
        // disNum: +:变化量+1, -:变化量-1, input:最终的个数 不是变化量
        // cart：点击的是哪个产品 里面有id
        switch (type) {
          case 'mins':
            // 减
            // 如果产品的个数大于1 才能传-1
            disNum = cart.skuNum > 1 ? -1 : 0
            break;
          case 'input':
            // 输入
            // 输入是非法的 传给服务器的变化量为0
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {
              // 正常情况 上传的还是变化的量 用户输入-产品起始的个数
              disNum = parseInt(disNum) - cart.skuNum
            }
            // 三目运算符下发
            // disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum
            break
          case 'plus':
            // 加
            disNum = 1
            break;
        }
        console.log(type, " ", disNum, " ", cart.skuId);
        // 发起请求 修改产品数量
        try {
          // 修改成功
          await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
          // 再次获取购物车列表
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }, 1000), // 1秒钟只能点一次
      // 删除某一个产品的操作
      async delteCartById(cart) {
        try {
          await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
          // 如果删除成功，再次发请求请求刷新列表
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改商品的勾选状态
      // 也要增加节流
      updateChecken:throttle(async function(cart, event) {
        try {
          let isChecked = event.target.checked ? '1' : 0
          await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked })
          // 如果修改成功，再次发请求请求刷新列表
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }, 500),
      // 删除选中的商品
      async deletaAllCheckedCart() {
        try {
          // 派发一个action
          await this.$store.dispatch('deletaAllCheckedCart')
          // 再发起请求
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改全部商品选中的状态
      async updateAllCartChecked(event) {
        try {
          let isChecked = event.target.checked ? '1' : '0'
          // 派发一个action
          await this.$store.dispatch('updataAllCartIsChecked', isChecked)
          // 再发起请求
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 跳转到结算页面
      goTrade() {
        this.$router.push('/trade')
      }
    },
    computed: {
      ...mapGetters(['cartInfoList']),
      // 计算购买产品的总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach((cart) => {
          sum += cart.skuPrice * cart.skuNum
        })
        console.log('总价为: ', sum);
        return sum
      },
      // 判断底部复选框是否勾选 全部商品都选中 才勾选
      isAllChecked() {
        // 遍历数组，里面的元素isChecked都为1才为真
        return this.cartInfoList.every( cart => cart.isChecked == 1)
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width:15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>