<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没登录的时候显示 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航：务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登录了，显示用户名 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button 
            class="sui-btn btn-xlarge btn-danger" 
            type="button" 
            @click="goSearch">
          搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: 'Header',
        data() {
          return {
            keyword: ''
          }
        },
        methods: {
          // 搜索按钮的回调函数，需要想search路由进行跳转
          goSearch() {
            // 路由传递参数：
            // 第一种.字符串形式：
            // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
            // 第二种，模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种：对象写法
            // this.$router.push({
            //   name: 'Search',
            //   params: {
            //     keyword: this.keyword,
            //   },
            //   query: {
            //     k: this.keyword.toUpperCase()
            //   }
            // })
            
            //面试题1：
            // 1.路由传递参数（对象写法）path是否可以结合parms参数一起使用？不可以
            // 答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用
            // this.$router.push({
            //   path: '/search',
            //   params:{
            //     keyword: this.keyword,
            //   },
            //   query:{
            //     k: this.keyword.toUpperCase()
            //   }
            // })

            // 面试题2。
            // 2.如何指定params参数可传可不传？
            // 如果路由要求传递parmas参数，但是就不传递params参数，就会出现URL有问题
            // 如何指定parmas参数可以传递也可以不传，在配置路由的时候，在占位后面加上一个问号[?]【表示parmas可以传递也可以不传递】
            // this.$router.push({
            //   name: 'Search',
            //   query:{
            //     k: this.keyword.toUpperCase()
            //   }
            // })

            // 面试题3:
            // 3.params参数可以传递也可以不传递，但是如果传递是空串，如解决？
            // 使用undefined解决：params参数可以传递也可以不传递，但是如果传递是空串
            // this.$router.push({
            //   name: 'Search',
            //   params:{
            //     keyword: '' || undefined
            //   },
            //   query:{
            //     k: this.keyword.toUpperCase()
            //   }
            // })

            // 面试题3:
            // 4.路由组件能不能传递props数据？
            // 可以传递,一共有三种写法
            // this.$router.push({
            //   name: 'Search',
            //   params: {
            //     keyword: this.keyword,
            //   },
            //   query: {
            //     k: this.keyword.toUpperCase()
            //   },
            // }, 
            // () => {}, // 成功的回调
            // (error) => {}, // 失败的回调
            // )

            // 合并参数
            // 如果有query参数也要捎带过去
            if (this.$route.query) {
                const location = {
                  name: 'Search',
                  params: { keyword: this.keyword || undefined },
                }
                location.query = this.$route.query
                console.log('点击搜索：', location);
                this.$router.push(location)
            } 
          },
          // 退出登录
          logout() {
            try {
              // 退出登录需要做的事
              // 1.需要发请求，通知服务器退出登录，清除一些数据 清除token
              // 2.清除项目中的数据 userInfo token
              this.$store.dispatch('userLogout')
              // 回到首页
              this.$router.push('/home')
            } catch (error) {
              alert(error.message)
            }
          }
        },
        mounted() {
          // 通过全局事件总线清楚关键字
          this.$bus.$on('clearKeyword', () => {
            this.keyword = ''
          })
        },
        computed: {
          // 用户信息
          ...mapGetters(['userName'])
        }
    };
</script>

<style scoped lang="less">
    .header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
            float: left;

            p {
            float: left;
            margin-right: 10px;

            .register {
                border-left: 1px solid #b3aeae;
                padding: 0 5px;
                margin-left: 5px;
            }
            }
        }

        .typeList {
            float: right;

            a {
            padding: 0 10px;

            & + a {
                border-left: 1px solid #b3aeae;
            }
            }
        }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
        float: left;

        .logo {
            img {
            width: 175px;
            margin: 25px 45px;
            }
        }
        }

        .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
            overflow: hidden;

            input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
                outline: none;
            }
            }

            button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
                outline: none;
            }
            }
        }
        }
    }
    }


</style>