<script setup>
import SecondaryTabBarItem from "@/components/secondary_tab_bar_item/SecondaryTabBarItem.vue";
</script>
<template>
  <div class="s_top">
    <div class="s_top_items">
      <secondary-tab-bar-item url="Recommend" mainContent="推荐"></secondary-tab-bar-item>
      <secondary-tab-bar-item url="LeaderBoard" mainContent="排行榜"></secondary-tab-bar-item>
      <secondary-tab-bar-item url="SingList" mainContent="歌单"></secondary-tab-bar-item>
      <secondary-tab-bar-item url="AnchorStation" mainContent="主播电台"></secondary-tab-bar-item>
      <secondary-tab-bar-item url="Singer" mainContent="歌手"></secondary-tab-bar-item>
      <secondary-tab-bar-item url="NewDiscs" mainContent="新碟上架"></secondary-tab-bar-item>
    </div>
  </div>
</template>
<style scoped lang="scss">
.s_top {
  background-color: #C20907;
  min-width: 980px;

  .s_top_items {
    display: flex;
    justify-content: center;
    width: 100vw;
    min-width: 720px;
  }
}
</style>
