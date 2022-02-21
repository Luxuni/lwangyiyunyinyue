<script setup>
import {toRaw} from "vue";
import {useStore} from "vuex";
const store = useStore ();
const props = defineProps ({
  item: {}
});
const showUserPlaylist = item => {
  const userWantShowPlaylistIs = {
    id: toRaw (item).id,
    offset: 0
  };
  //保存歌单id
  store.dispatch ("myplaylist/getUserWantShowPlaylistId", userWantShowPlaylistIs);
  //获取歌单数据
  store.dispatch ("myplaylist/getUserWantShowPlaylist", userWantShowPlaylistIs);
  //获取歌单评论
  store.dispatch ("myplaylist/getUserWantPlaylistComment", userWantShowPlaylistIs);
  // store.dispatch('playlist/processPlaylist',userWantShowPlaylistIs)
  store.commit ("myplaylist/GET_USER_WANT_SHOW_PLAYLIST_MESSAGE", item);
};
</script>
<template>
  <div @click="showUserPlaylist(item)">
    <router-link :to="{name:'MyPlaylist'}" class="m_container">
      <img :src="item.coverImgUrl" alt="">
      <div class="m_content">
        <p>{{ item.name }}</p>
        <div>{{ item.trackCount }}首</div>
      </div>
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.m_container {
  width: 240px;
  height: 54px;
  padding: 6px 0 6px 20px;
  display: grid;
  grid-template-columns: 40px 180px;
  cursor: pointer;

  img {
    height: 40px;
    width: 40px;
  }

  .m_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p, div {
      width: 150px;
      padding-left: 10px;
      font-size: 12px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
