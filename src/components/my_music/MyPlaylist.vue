<script setup>
import {useStore} from "vuex";
const store = useStore ();
import {computed, reactive, ref, toRaw} from "vue";
import PlayListHead from "./PlayListHead.vue";
import RecommendNavBar from "../listnavbar/RecommendNavBar.vue";
import Comment from "../comment/Comment.vue";
const playlistTotal = ref (0);
const userWantShowPlaylistMessage = computed (() => {
  if (toRaw (store.state.myplaylist.userWantShowPlaylistMessage).trackCount !== undefined) {
    playlistTotal.value = toRaw (store.state.myplaylist.userWantShowPlaylistMessage).trackCount;
  }
  return store.state.myplaylist.userWantShowPlaylistMessage;
});
const userWantShowPlaylist = computed (() => {
  return store.state.myplaylist.userWantShowPlaylist;
});
const userWantShowPlaylistIs = {
  offset: 0
};
const playlistCurrentPage = ref (1);
const playlistPageSize = ref (20);
const playlistHandleCurrentChange = (val) => {
  userWantShowPlaylistIs.offset = val - 1;
  store.dispatch ("myplaylist/getUserWantShowPlaylist", userWantShowPlaylistIs);
};
const willPlay = scope => {
  store.dispatch ("playlist/getPlaylistDetail", scope.row);
};
//拿取精彩评论
const hotComments = computed (() => {
  return store.state.myplaylist.hotComments;
});
//拿取最新评论
const commentsTotal = computed (() => {
  return store.state.myplaylist.commentsTotal;
});
const comments = computed (() => {
  return store.state.myplaylist.comments;
});
const commentsCurrentPage = ref (1);
const commentsPageSize = ref (20);
const userWantShowComments = reactive({
  offset: 0
});
const commentsHandleCurrentChange = (val) => {
  userWantShowComments.offset = val - 1;
  store.dispatch ("myplaylist/getUserWantPlaylistComment", userWantShowComments);
};
</script>
<template>
  <play-list-head :userWantShowPlaylistMessage="userWantShowPlaylistMessage"></play-list-head>
  <recommend-nav-bar class="recommend_nav_bar"
                     mTitle="m_title">
    <template v-slot:m_title>歌曲列表</template>
    <template v-slot:songs_count>{{ userWantShowPlaylistMessage.trackCount }}首歌</template>
    <template v-slot:more>
      <span class="s_more">播放 <i>{{ userWantShowPlaylistMessage.playCount }}</i> 次</span>
    </template>
  </recommend-nav-bar>
  <div style="padding-left: 15px;padding-right: 15px;">
    <el-table :data="userWantShowPlaylist" style="width: 100%">
      <el-table-column type="index" width="50"/>
      <el-table-column width="60">
        <template #default="scope">
          <el-button color="#d63031"
                     style="color: white"
                     :circle="true"
                     size="small"
                     @click="willPlay(scope)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_play"></use>
            </svg>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌名" width="200"/>
      <el-table-column prop="time" label="时长" width="200"/>
      <el-table-column prop="ar" label="歌手" width="200"/>
    </el-table>
    <el-pagination
      v-model:currentPage="playlistCurrentPage"
      v-model:page-size="playlistPageSize"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="playlistTotal"
      @current-change="playlistHandleCurrentChange">
    </el-pagination>
    <div v-show="userWantShowComments.offset===0">
      <recommend-nav-bar mTitle="generally"
                         :pointShow="false"
                         class="recommend_nav_bar">
        <template v-slot:m_title>精彩评论</template>
      </recommend-nav-bar>
      <comment :comments="hotComments"></comment>
    </div>
    <recommend-nav-bar mTitle="generally"
                       :pointShow="false"
                       class="recommend_nav_bar">
      <template v-slot:m_title>最新评论</template>
    </recommend-nav-bar>
    <comment :comments="comments"></comment>
    <el-pagination
      v-model:currentPage="commentsCurrentPage"
      v-model:page-size="commentsPageSize"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="commentsTotal"
      @current-change="commentsHandleCurrentChange">
    </el-pagination>
  </div>
</template>
<style scoped lang="scss">
.recommend_nav_bar {
  margin: 0 20px 20px 20px;

  .s_more {
    font-size: 12px;

    i {
      color: #B2281E;
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
