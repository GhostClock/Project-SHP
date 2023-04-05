<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 带有x的结构-->
        <div class="bread"> 
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(arrtValue, index) in searchParams.props" :key="index">{{ arrtValue.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector 选择器-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details 详情-->
        <div class="details clearfix">
          
          <!-- 价格导航 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active: isOrderByOne}" @click="changeOrder('1')">
                  <a>综合
                    <span v-show="isOrderByOne">{{ isAscUP }}</span>
                  </a>
                </li>
                <li :class="{active: isOrderByTwo}" @click="changeOrder('2')">
                  <a>价格
                    <span v-show="isOrderByTwo">{{ isAscUP }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- 分页器:测试数据，后面需要替换 -->
          <Pagination 
            :pageNo=searchParams.pageNo 
            :pageSize=searchParams.pageSize 
            :total=total 
            :continues=5 
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters, mapState } from "vuex";

  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data() {
      return {
        // 传递给服务器的参数
        searchParams: {
          "category1Id": "",  // 一级分类的ID
          "category2Id": "",  // 二级分类的ID
          "category3Id": "",  // 三级分类的ID
          "categoryName": "", // 分类的名字
          "keyword": "",      // 关键字
          "order": "1:asc",  // 排序方式 初始状态应该是综合:降序
          "pageNo": 1,        // 当前第几页
          "pageSize": 3,      // 每页展示数据的多少
          "props": [],        // 平台售卖属性的参数
          "trademark": ""     // 品牌
        }
      }
    },
    // 当组件挂载完成之前执行一次，先于mounted
    beforeMount() {
      // 在发请求之前，把接口需要的数据，把参数整理好
      // Object.assign简写形式 合并对象
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    // 组件挂载完毕，只执行一次
    mounted() {
      this.getData();
    },
    computed: {
      // mapGetters里面的写法：传递的是数组，因为getters计算是没有划分模块的【没有home、search】
      ...mapGetters(['goodsList']),
      // 获取一共有多少条数据
      ...mapState({
        total: state => state.search.searchList.total,
      }),
      // 综合高亮
      isOrderByOne() {
        return this.searchParams.order.indexOf('1') != -1
      },
      // 降序高亮
      isOrderByTwo() {
        return this.searchParams.order.indexOf('2') != -1
      },
      isAscUP() { // 是否是升序
        // asc:升序 desc:降序
        return this.searchParams.order.includes('asc') ? '⬆︎' : '⬇︎'
      }
    },
    methods: {
      // 向服务器发起请求获取search模块数据 更加不同的参数返回不同的数据进行展示
      // 封装成一个函数，当需要在调用的时候调用即可
      getData() {
        this.$store.dispatch('getSearchList', this.searchParams)
      },
      // 删除历史搜索结果
      removeCategoryName() {
        // 带给服务器的参数都是可有可无的，如果属性值为空，可以赋值为undefined，就不会带给服务器，这样性能更好
        this.searchParams.categoryName = 
        this.searchParams.category1Id  =
        this.searchParams.category2Id  =
        this.searchParams.category3Id  =  undefined
        this.getData()
        // 地址栏也需要修改--- 进行路由跳转
        // 如果路径中有params参数，也 应该带上
        this.$router.push({
          name: 'Search',
          params: this.$route.params ? // 如果有params参数得带上
            this.$route.params :
            undefined
        })
      },
      // 移出面包屑的搜索关键字
      removeKeyword() {
        // 给服务器带的参数searchParams的keyword的值置空
        this.searchParams.keyword = undefined
        // 再次发起请求 
        this.getData()
        // 通知header组件清楚keyword
        this.$bus.$emit('clearKeyword')
        // 进行路由的跳转 
        this.$router.push({
          name: 'Search', 
          query: this.$route.query ?  // 如果有query参数得带上
          this.$route.query : 
          undefined
        })
      },
      // 品牌自定义事件的回调
      trademarkInfo({tmId, tmName}) {
        // 示例: "1:苹果"
        this.searchParams.trademark = `${tmId}:${tmName}`
        // 再次发起请求 
        this.getData()
      },
      // 移出品牌的历史搜索结果
      removeTrademark() {
        // 移出品牌信息
        this.searchParams.trademark = undefined
        // 再次发起请求
        this.getData()
      },
      // 手机平台属性的回调 自定义事件
      attrInfo({attrId, attrName}, attrValue) {
        // 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        const props = `${attrId}:${attrValue}:${attrName}`
        // 数组去重 防止多次点击时，重复添加的问题
        if (this.searchParams.props.indexOf(props) == -1) {
          this.searchParams.props.push(props)
        }
        // 再次发起请求
        this.getData()
      },
      // 移除售卖属性
      removeAttr(index ) {
        // 整理参数
        this.searchParams.props.splice(index, 1)
        // 再次发起请求
        this.getData()
      },
      // 排序操作
      // flag:表示的是用户点击的是综合还是价格 用户点击传递
      // 
      changeOrder(flag) {
        const originOrder = this.searchParams.order
        // 获取最开始的状态
        const originFlag = originOrder.split(':')[0]
        const originSort = originOrder.split(':')[1]
        // // 一定是点击的当前高亮的
        let newOrder = ''
        if (flag == originFlag) {
          // 点击的综合
          newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
        } else {
          // 点击的是价格
          newOrder = `${flag}:${'desc'}`
        }
        console.log(newOrder);
        // 将新的orde赋值给searchParams
        this.searchParams.order = newOrder
        // 再次发起请求
        this.getData()
      },
      // 这是自定义事件的回调函数 - 获取当前第几页
      getPageNo(pageNo) {
        // 整理参数，向服务器请求数据
        this.searchParams.pageNo = pageNo
        // 再次发起请求 
        this.getData()
      }
    },
    // 数据监听：监听组件实例身上的属性值的变化
    watch: {
      // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
      $route(newValue, oldValue) {
        // 再次整理参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        console.log('搜索页的请求参数', this.searchParams);
        // 再次发起请求
        this.getData();
        // 请求完毕后，应该要把三级分类的id置空，让其接受下一次的三级分类
        this.searchParams.category1Id = 
        this.searchParams.category2Id = 
        this.searchParams.category3Id = undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>