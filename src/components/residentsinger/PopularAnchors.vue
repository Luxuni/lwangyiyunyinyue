<script setup>
import RecommendNavBar from "@/components/listnavbar/RecommendNavBar.vue";
import {getNewcomer} from "@/network/recommendlist/newcomer";
const {data: res} = await getNewcomer (5);
const newcomers = res.data.list;
</script>
<template>
  <div class="anchors">
    <recommend-nav-bar mUrl="Singer"
                       mTitle="generally"
                       :pointShow="false"
                       class="n_singer_bar">
      <template v-slot:m_title>热门主播</template>
    </recommend-nav-bar>
    <router-link :class="{newcomers_container:index>0,newcomers_container_first:index===0}"
                 :to="{name:'AnchorStation'}"
                 v-for="(newcomer,index) of newcomers"
                 :key="newcomer.id">
      <div class="newcomer">
        <div class="newcomer_head">
          <img :src="newcomer.avatarUrl" alt="">
        </div>
        <span class="name">{{ newcomer.nickName }}</span>
      </div>
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.anchors {
  .n_singer_bar {
    padding: 0 10px 10px 10px;
    margin: 0 20px;
    border-bottom: 2px solid #d1cdcd;
  }

  .newcomers_container_first {
    display: block;
    height: 50px;
    width: 210px;
    margin: 20px 20px 10px 20px;
    .newcomer {
      display: flex;
      height: 50px;
      width: 210px;

      .newcomer_head {
        img {
          height: 40px;
          width: 40px;
        }
      }

      .name {
        width: 160px;
        margin-left: 10px;
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }

  .newcomers_container {
    display: block;
    height: 50px;
    width: 210px;
    margin: 0 20px 10px 20px;

    .newcomer {
      display: flex;
      height: 50px;
      width: 210px;

      .newcomer_head {
        img {
          height: 40px;
          width: 40px;
        }
      }

      .name {
        width: 160px;
        margin-left: 10px;
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
