<template>
  <!-- 轮播图 carouselList -->
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 立即监听，不管数据有没有变化，上来就立即监听一次
      // 为什么watch监听不到？因为数据是父组件传递下来的，没有发生变化
      immediate: true,
      handler(newValue, oldValue) {
        // 监听Floor组件中的List数据
        // 只能监听数据已经有了，但是v-for动态渲染的结构我们是没有的，应该还是要用到nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击分页器也能切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>