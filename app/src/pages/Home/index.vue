<template>
  <div>
    <!-- 三级联动的全局组件：已经注册为全局组件，不需要再次引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- v-for遍历出组件 -->
    <!-- Floor内部无网络请求，数据式Home组件传递给子组件 -->
    <Floor v-for="floor in flooList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";

// 引入其余的组件
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 派发action,获取floor组件的数据
    this.$store.dispatch('getFloorList'),
    // 获取用户信息
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      flooList: state => state.home.floorList,
    }),
  },
  methods: {
      async getUserInfo() {
        // 在首页获取用户信息
        try {
          const { ok, message } = await this.$store.dispatch('getUserInfo')
          if (!ok) {
            alert(message)
          }
        } catch (error) {
          alert(error.message)
        }
      }
  },
}
</script>

<style>

</style>