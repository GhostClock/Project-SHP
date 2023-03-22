<template>
  <div>
    <!-- 三级联动的全局组件：已经注册为全局组件，不需要再次引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
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
  }
}
</script>

<style>

</style>