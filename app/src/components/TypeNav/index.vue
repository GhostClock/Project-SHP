<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      
      <!-- 事件的委派 | 实践的委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式路由导航 实现路由跳转和参数传递-->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ current: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>

                <!-- 二级分类 、三级分类 -->
                <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block' : 'none'}">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </transition>
      </div>
      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入的方式：是吧lodash全部的功能函数都引入了
// 最好的引入方式：按需加载
import throttle from 'lodash/throttle';

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个分类
      currentIndex: -1,
      show: true
    };
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex的值
    // throttle回调函数别用剪头函数，会出现上下文问题
    changeIndex: throttle(function (index) {
      // index:鼠标移上某一个一级分类元素的索引值
      // 正常情况，用户慢慢操作，鼠标进入，每个一级h3，都会触发鼠标进入事件
      // 非正常情况用户操作很快，本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数种有大量的计算业务，就有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true
    },

    // 一级分类鼠标移出的实践回调
    leaveShow() {
      // 鼠标移出
      this.currentIndex = -1;
      // 如果是Search组件路由的时候才进行判断隐藏
      if (this.$route.path != '/home') {
        this.show = false 
      }
    },

    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 使用事件委派有一定问题：1.点击的是哪个a标签，2.如何获取参数1 2 3分类产品的name和id
      // 存在的问题：事件委派，是把全部子节点的事件全部委派给父节点
      // 实际是点击a标签的时候才进行跳转。怎么确定是点击了a标签 ，怎么确定点击了是哪个a标签
      
      // 怎么确定是点击了a标签？
      // 把子节点种加上自定义属性，加上data-categoryName，其余标签没有该属性
      const element = event.target
      // 获取到当前触发事件的结点，但是需要带有ata-categoryName这样的结点 一定是a标签
      // 结点有一个属性式dataset属性，可以获取自定义结点属性
      const {categoryname, category1id, category2id, category3id} = element.dataset
      // 有categoryName表示一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = {name: 'Search'}
        let query = {
          'categoryName': categoryname,
          'category1Id': category1id,
          'category2Id': category2id,
          'category3Id': category3id,
        }
        // 怎么区别1 2 3级别的分类的a标签
        if (category1id) {
          // 一级a标签
          query.category1Id = category1id
        } else if(category2id) {
          // 二级a标签
          query.category2Id = category2id
        } else {
          // 三级a标签
          query.category3Id = category3id
        }
        // 判断：如果跳转的时候，带有params参数、也要捎带传递过去
        // 合并参数
        if (this.$route.params) {
          location.params = this.$route.params
          // 参数整理完毕
          location.query = query
          // 开始路由跳转
          console.log('点击分类', location);
          this.$router.push(location)
        }
        this.currentIndex = -1;
      }
    },
  },
  // 组件挂载完毕，就可以向服务器发起请求
  mounted() {
    // 如果不是Home路由组件，将TypeNav进行隐藏
    this.show = this.$route.path == '/home' 
  },
  computed: {
    ...mapState({
      // 对象写法，右侧是一个函数，当使用这个计算属性的时候，函数会立即执行一次
      // 注入一个参数state，其实即为大仓库的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .current {
          background: skyblue;
        }
      }
    }
    // 过度动画的样式
    // 过度动画开始的阶段 （进入）
    .sort-enter {
      height: 0px;
    }
    // 过度动画的结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义过度动画的时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }

  }
}
</style>