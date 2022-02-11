<script setup>
import {defineProps} from "vue";
import {useStore} from "vuex";
const store = useStore ();
defineProps ({
  standardMessages: {}
});
const willProcessPlaylist = message => {
  store.dispatch ("playlist/processPlaylist", message);
};
</script>
<template>
  <div class="m_list_container">
    <div class="list_item_container"
         v-for="message of standardMessages"
         :key="message.id">
      <div class="list_item_img">
        <img :src="message.picUrl" alt="">
        <div class="list_item_play_count_container">
          <div>
            <svg class="icon count_icon" aria-hidden="true">
              <use xlink:href="#icon-tinggeshiqu"></use>
            </svg>
            <p class="list_item_play_count">
              <span class="list_item_count">{{ message.artistName ?? message.playCount }}</span>
            </p>
          </div>
          <span class="play_btn"
                @click="willProcessPlaylist(message)">
             <svg class="icon play_icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          </span>
        </div>
      </div>
      <p class="list_item_name">{{ message.albumName ?? message.name }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_list_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .list_item_container {
    padding-bottom: 35px;

    .list_item_img {
      position: relative;
      overflow: hidden;

      &:hover {
        .list_item_play_count_container {
          bottom: 0;
        }
      }

      img {
        height: 140px;
        width: 140px;
      }

      .list_item_play_count_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: -27px;
        height: 27px;
        width: 140px;
        background-color: rgba(0, 0, 0, 0.6);
        transition: all .3s linear;

        div {
          display: flex;
          align-items: center;

          .count_icon {
            margin: 0 10px;
            font-size: .8em;
            color: #fff;
          }

          .list_item_play_count {
            display: flex;
            align-items: center;
            height: 27px;

            .list_item_count {
              font-size: 12px;
              color: rgba(204, 204, 204);
            }
          }
        }


        .play_btn {
          cursor: pointer;
          margin-right: 10px;

          &:hover {
            .play_icon {
              color: #fff;
            }
          }

          .play_icon {
            color: rgba(204, 204, 204);
            transition: all .3s linear;
          }
        }
      }
    }

    .list_item_name {
      width: 140px;
      font-size: 14px;
    }
  }
}
</style>
