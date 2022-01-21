<script setup>
import MainTabBar from "@/components/tabbar/MainTabBar.vue";
import SecondaryTabBar from "@/components/tabbar/SecondaryTabBar.vue";
</script>
<template>
  <suspense>
    <template #default>
      <div>
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
    </template>
  </suspense>
</template>
<style scoped lang="scss">
.m_view {
  display: flex;
  justify-content: center;
  .s_view{
    width:980px;
    min-width: 980px;
  }
}
</style>
