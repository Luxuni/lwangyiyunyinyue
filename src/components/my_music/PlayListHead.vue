<script setup>
import dayjs from "dayjs";
const props=defineProps({
  userWantShowPlaylistMessage:{}
})
</script>

<template>
  <div class="head_m_container">
    <span class="cover_m_container">
      <img :src="userWantShowPlaylistMessage.coverImgUrl" alt="">
    </span>
    <div class="right_m_container">
      <div class="name_m_container">
        <i class="type"></i>
        <h2>{{ userWantShowPlaylistMessage.name }}</h2>
      </div>
      <div class="author_create_time_container">
         <span class="author_cover_container">
            <img :src="userWantShowPlaylistMessage.creator?.avatarUrl" alt="">
         </span>
        <span class="author_name">
          {{ userWantShowPlaylistMessage.creator?.nickname }}
        </span>
        <span class="create_time">{{ dayjs (userWantShowPlaylistMessage.createTime).format ("YYYY-MM-DD") }} 创建</span>
      </div>
      <div class="operate_container">
        <el-button size="default"
                   color="#c0392b"
                   style="color: #ffffff;">播放
        </el-button>
        <el-button size="default"
                   color="#c0392b"
                   :disabled="userWantShowPlaylistMessage.subscribed"
                   style="color: #ffffff;">订阅{{ userWantShowPlaylistMessage.subscribedCount }}
        </el-button>
        <el-button size="default"
                   color="#c0392b"
                   style="color: #ffffff;">转发
        </el-button>
        <el-button size="default"
                   color="#c0392b"
                   style="color: #ffffff;">下载
        </el-button>
        <el-button size="default"
                   color="#c0392b"
                   style="color: #ffffff;">评论
        </el-button>
      </div>
      <div class="label_container">
        <span>标签:</span>
        <el-tag v-for="label of userWantShowPlaylistMessage.tags"
                type="danger"
                style="margin-left: 8px">{{ label }}
        </el-tag>
      </div>
      <div class="description_container">
        <p>介绍：{{ userWantShowPlaylistMessage.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.head_m_container {
  display: grid;
  width: 740px;
  height: 280px;
  padding: 40px;
  grid-template-columns: 208px 452px;

  .cover_m_container {
    img {
      height: 200px;
      width: 200px;
      padding: 8px;
      border: 1px solid #d1cdcd;
    }
  }

  .right_m_container {
    padding-left: 20px;

    .name_m_container {
      display: flex;
      align-items: center;

      .type {
        width: 54px;
        height: 24px;
        background: url('../../assets/images/two.png') 0 -243px;
      }

      h2 {
        margin-left: 10px;
        font-size: 20px;
      }
    }

    .author_create_time_container {
      display: flex;
      margin-top: 10px;
      align-items: center;

      .author_cover_container {
        img {
          height: 35px;
          width: 35px;
        }
      }

      .author_name {
        margin-left: 20px;
        font-size: 12px;
      }

      .create_time {
        margin-left: 20px;
        font-size: 12px;
      }
    }

    .operate_container {
      margin-top: 10px;
    }

    .label_container {
      margin-top: 10px;

      span {
        font-size: 12px;
      }
    }

    .description_container {
      margin-top: 10px;

      p {
        font-size: 12px;
      }
    }
  }


}
</style>
