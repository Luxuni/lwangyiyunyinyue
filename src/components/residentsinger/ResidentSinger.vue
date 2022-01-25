<script setup>
import RecommendNavBar from "@/components/listnavbar/RecommendNavBar.vue";
import {getResidentSinger} from "@/network/residentsinger/resident";
const {data: res} = await getResidentSinger (0, 5);
const artists = res.artists;
</script>
<template>
  <div class="n_singer">
    <recommend-nav-bar mUrl="Singer"
                       mTitle="generally"
                       :pointShow="false"
                       class="n_singer_bar">
      <template v-slot:m_title>入驻歌手</template>
      <template v-slot:more>
        <div class="s_more">查看全部</div>
      </template>
    </recommend-nav-bar>
    <router-link :to="{name:'Singer'}"
                 v-for="artist of artists"
                 :key="artist.id"
                 class="singer">
      <div class="head">
        <img :src="artist.picUrl" alt="">
      </div>
      <div class="body">
        <p>{{ artist.name }}</p>
        <template v-for="alia of artist.alias">
          <span>{{ alia }}</span>
        </template>
      </div>
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.n_singer {
  height: 455px;
  width: 250px;
  padding-top: 20px;
  border: 1px solid #d1cdcd;

  .n_singer_bar {
    padding: 0 10px 10px 10px;
    margin: 0 20px;
    border-bottom: 2px solid #d1cdcd;

    .s_more {
      font-size: 12px;
    }
  }

  .singer {
    display: flex;
    height: 62px;
    width: 210px;
    margin: 17px 20px 10px 20px;
    border: 1px solid #d1cdcd;
    background-color: #f1ddd1;
    transition: all .3s linear;

    &:hover {
      background-color: #F6B988;
    }

    .head {


      img {
        height: 62px;
        width: 62px;
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 62px;
      width: 148px;
      padding-left: 14px;

      p {
        margin-top: 8px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }

      span {
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }

}
</style>
