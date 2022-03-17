<script setup>
import {getBanner} from "@/network/banner/banner";
const {data: res} = await getBanner (0);
const banners = res.banners;
</script>
<template>
  <el-carousel :interval="5000" arrow="hover">
    <el-carousel-item v-for="banner of banners" :key="banner.targetId">
      <img :src="banner.imageUrl" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<style scoped lang="scss">
.el-carousel__item {

  img {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    height: 300px;
    width: 730px;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
}
</style>
