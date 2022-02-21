<script setup>
import {useStore} from "vuex";
import {computed, ref, toRaw, watch} from "vue";
import MyNavigation from "@/components/my_music/MyNavigation.vue";
import {ElMessage} from "element-plus";
const store = useStore ();
const userDetail = computed (() => {
  return store.state.user.userDetail;
});
if (toRaw (userDetail.value) === null) {
  ElMessage ({
    message: "请先登陆",
    grouping: true,
    type: "warning"
  });
}
watch (userDetail, (newValue) => {
  if (toRaw (newValue) === {}) {
    ElMessage ({
      message: "this is a message.",
      grouping: true,
      type: "success"
    });
  }
});
const res = computed (() => {
  return store.state.user.userSubCount;
});
const userCreatePlaylist = computed (() => {
  return store.state.user.userCreatePlaylist;
});
const userCollectPlaylist = computed (() => {
  return store.state.user.userCollectPlaylist;
});
const isShowUserCreatePlaylistItem = ref (false);
const openCreatePlaylist = () => {
  isShowUserCreatePlaylistItem.value ? isShowUserCreatePlaylistItem.value = false : isShowUserCreatePlaylistItem.value = true;
};
const isShowUserCollectPlaylistItem = ref (false);
const openCollectPlaylist = () => {
  isShowUserCollectPlaylistItem.value ? isShowUserCollectPlaylistItem.value = false : isShowUserCollectPlaylistItem.value = true;
};
const createNewPlaylist = () => {
  console.log (222);
};
</script>
<template>
  <div class="my_music_container">
    <div class="my_music_left_container">
      <div class="s_container">
        <router-link :to="{name:'UserArtists'}"
                     class="my_singer">
          我的歌手({{ res.artistCount }})
        </router-link>
        <h2 class="my_create_playlist" @click="openCreatePlaylist">
          创建的歌单({{ res.createdPlaylistCount }})
          <el-button size="small"
                     color="#b2bec3"
                     style="color: #000000;margin-left:10px;"
                     @click.stop="createNewPlaylist">新建
          </el-button>
        </h2>
        <my-navigation v-for="userCreatePlaylistItem of userCreatePlaylist"
                       :item="userCreatePlaylistItem"
                       v-show="isShowUserCreatePlaylistItem"></my-navigation>
        <h2 class="my_sub_playlist"
            @click="openCollectPlaylist">
          收藏的歌单({{ res.subPlaylistCount }})
        </h2>
        <my-navigation v-for="userCollectPlaylistItem of userCollectPlaylist"
                       :item="userCollectPlaylistItem"
                       v-show="isShowUserCollectPlaylistItem"></my-navigation>
      </div>
    </div>
    <div class="my_music_right_container">
      <router-view #default="{Component}">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>
<style scoped lang="scss">
.my_music_container {
  display: grid;
  grid-template-columns: 240px 740px;
  background-color: #fff;

  .my_music_left_container {
    width: 240px;

    .s_container {
      padding-top: 40px;
      border-left: 1px solid #d1cdcd;
      border-right: 1px solid #d1cdcd;

      .my_singer, .my_create_playlist, .my_sub_playlist {
        display: block;
        width: 200px;
        height: 36px;
        line-height: 36px;
        padding: 0 5px 2px 35px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  .my_music_right_container {
    width: 740px;

  }
}
</style>
