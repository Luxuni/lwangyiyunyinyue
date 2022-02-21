<script setup>
import {defineProps} from "vue";
defineProps ({
  mUrl: {},
  sTitle: {},
  mTitle:{},
  pointShow: {},
});

</script>
<template>
  <div class="recommend_navbar_container">
  <span class="right">
    <span class="m_point" v-show="pointShow">
    <span class="s_point"></span>
  </span>
    <router-link :class="mTitle" :to="{name:mUrl}">
      <slot name="m_title"></slot>
    </router-link>
    <div class="s_title_container">
      <router-link
        :to="{name:title.url}"
        v-for="(title,index) of sTitle"
        :class="{'s_title':index<sTitle.length-1,'s_title_last':index===sTitle.length-1}">
        {{ title.name }}
      </router-link>
      <span>
      <slot name="songs_count"></slot>
      </span>
    </div>
  </span>
    <router-link :to="{name:mUrl}">
      <slot name="more"></slot>
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.recommend_navbar_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 3px solid #B2281E;

  .right {
    display: flex;
    align-items: center;

    .m_point {
      position: relative;
      height: 20px;
      width: 20px;
      border-radius: 20px;
      background-color: #B2281E;

      .s_point {
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        height: 10px;
        width: 10px;
        border-radius: 10px;
        background-color: #fff;
      }
    }

    .m_title {
      font-size: 20px;
      font-weight: bold;
      padding: 0 20px 0 5px;
    }
    .generally{
      font-size: 12px;
      padding: 0 20px 0 5px;
    }

    .s_title_container {
      span{
        font-size: 12px;
      }
      .s_title, .s_title_last {
        padding: 0 15px;
        font-size: 12px;
      }

      .s_title {
        border-right: 1px solid #C1C1C1;
      }

      .s_title_last {
        border-right: 0;
      }
    }
  }
}
</style>
