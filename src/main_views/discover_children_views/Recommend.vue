<script setup>
import Banner from "@/components/banner/Banner.vue";
import Download from "@/components/download/Download.vue";
</script>
<template>
  <div class="m_recommend">
    <div class="recommend_left">
      <!--      轮播图组件-->
      <banner></banner>
    </div>
    <div class="recommend_right">
      <!--      推广app组件-->
      <download></download>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_recommend {
  display: flex;

  .recommend_left {
    width: 730px;
  }

  .recommend_right {
    width: 250px;
  }
}
</style>
