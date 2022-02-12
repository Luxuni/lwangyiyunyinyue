<script setup>
import MainTabBar from "@/components/tabbar/MainTabBar.vue";
import SecondaryTabBar from "@/components/tabbar/SecondaryTabBar.vue";
import Player from "@/components/playmusic/Player.vue";
</script>
<template>
  <suspense>
    <template #default>
      <div class="main_container">
        <div class="content">
          <main-tab-bar></main-tab-bar>
          <router-view name="SecondaryTabBar" #default="{Component}">
            <component :is="Component??SecondaryTabBar"></component>
          </router-view>
          <div class="m_view">
            <div class="s_view">
              <router-view #default="{Component}">
                <component :is="Component"></component>
              </router-view>
            </div>
          </div>
        </div>
        <div class="footer">
          <player></player>
        </div>
      </div>
    </template>
  </suspense>
</template>
<style scoped lang="scss">
.main_container {
  min-width: 980px;
  min-height: 100%;

  .content {
    height: calc(100% - 60px);

    .m_view {
      display: flex;
      justify-content: center;
      background-color: #F5D7BE;

      .s_view {
        width: 980px;
      }
    }
  }

  .footer {
    position: fixed;
    height: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
