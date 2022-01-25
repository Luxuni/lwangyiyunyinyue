<script setup>
import {defineProps} from "vue";
defineProps ({
  standardMessages: {}
});
</script>
<template>
  <div class="container">
    <el-scrollbar
      :noresize="true">
      <div class="flex-content">
        <div v-for="message of standardMessages" :key="message.albumId" class="scrollbar-demo-item">
          <div class="m_container">
            <router-link class="img" :to="{name:'NewDiscs'}">
              <img :src="message.coverUrl" alt="">
            </router-link>
            <router-link :to="{name:'NewDiscs'}">
              <p class="name">{{ message.albumName }}</p>
            </router-link>
            <router-link :to="{name:'Singer'}">
              <span class="singer">{{ message.artistName }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss">
.container {
  height: 180px;
  width: 100%;
  padding: 20px 20px 0 20px;
  margin-top: 20px;
  border: 2px solid #d1cdcd;
  background-color: #eaded7;

  .flex-content {
    display: flex;

    .scrollbar-demo-item {
      .m_container {
        height: 150px;
        width: 118px;

        .img {
          height: 100px;
          width: 118px;

          img {
            height: 100px;
            width: 100px;
          }
        }

        .name {
          width: 100px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .singer {
          font-size: 12px;

        }
      }
    }
  }
}
</style>
