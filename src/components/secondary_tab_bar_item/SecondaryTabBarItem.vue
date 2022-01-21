<script setup>
import {defineProps} from "vue";
defineProps ({
  url: {},
  mainContent: {}
});
</script>
<template>
  <router-link :to="{name:url}" active-class="s_top_active">
    <em class="main_content">{{ mainContent }}</em>
  </router-link>
</template>
<style scoped lang="scss">
a {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 34px;

  em {
    display: inline-block;
    height: 20px;
    padding: 0 5px;
    border-radius: 20px;
    font-size: 12px;
    color: #fff;
  }
}

.s_top_active {
  em {
    background-color: #9B1509;
  }
}
</style>
