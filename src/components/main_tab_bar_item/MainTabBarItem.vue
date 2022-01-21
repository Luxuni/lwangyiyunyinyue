<script setup>
import {defineProps} from "vue";
defineProps ({
  url: {},
  mainContent: {},
  arrow:{
    default:false
  }
});
</script>
<template>
  <router-link active-class="m_top_active" :to="url">
    <h1>
      {{ mainContent }}
      <sub v-show="arrow" class="cur"></sub>
      <sup class="remind">
        <slot name="remind"></slot>
      </sup>
    </h1>
  </router-link>
</template>
<style scoped lang="scss">
a {
  position: relative;
  padding: 0 19px;

  h1 {
    height: 69px;
    line-height: 69px;
    font-size: 14px;
    color: #fff;

    .cur {
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 46%;
      height: 7px;
      width: 12px;
      background-image: url(../../assets/images/one.png);
      background-position: -217px -140px;
    }

    .remind {
      position: absolute;
      top: 30%;
      right: -10%;
    }
  }
}

.m_top_active {
  background-color: #000000;
}
</style>
