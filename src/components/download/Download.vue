<script setup>
import {ref} from "vue";
let isDownloadBtn = ref (false);
</script>
<template>
  <div class="container_download">
    <div class="m_download"
         @mouseenter="isDownloadBtn=true"
         @mouseleave="isDownloadBtn=false">
      <router-link v-show="isDownloadBtn"
                   :to="{name:'DownloadApps'}">
      </router-link>
    </div>
    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
  </div>
</template>
<style scoped lang="scss">
.container_download{
background-color: #000000;
  .m_download {
    position: relative;
    height: 283px;
    background-image: url(../../assets/images/download.png);
    background-position: 0 0;

    a {
      display: inline-block;
      position: absolute;
      top: 186px;
      right: 50%;
      transform: translate(51%, 0);
      width: 215px;
      height: 56px;
      background-image: url(../../assets/images/download.png);
      background-position: 0 -290px;
    }
  }

  p {
    text-align: center;
    font-size: 12px;
    color: #8D8D8D;
  }
}

</style>
