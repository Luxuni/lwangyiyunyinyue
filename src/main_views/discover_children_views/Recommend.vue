<script setup>
import Banner from "@/components/banner/Banner.vue";
import Download from "@/components/download/Download.vue";
import RecommendNavBar from "@/components/listnavbar/RecommendNavBar.vue";
import RecommendListItem from "@/components/recommendlist/RecommendListItem.vue";
import {getPersonalized} from "@/network/recommendlist/recommendList";
import LoginBox from "@/components/login/LoginBox.vue";
import UserBox from "@/components/login/UserBox.vue";
import ResidentSinger from "@/components/residentsinger/ResidentSinger.vue";
import {getAlbumList} from "@/network/recommendlist/albumlist";
import AlbumList from "@/components/recommendlist/AlbumList.vue";
import PopularAnchors from "@/components/residentsinger/PopularAnchors.vue";
import List from "@/components/recommendlist/List.vue";
import {getList} from "@/network/recommendlist/list";
import {computed, reactive} from "vue";
import {getCookie} from "@/until/cookie";
import {useStore} from "vuex";
const store = useStore ();
const titles = [
  {url: "SingList", name: "华语"},
  {url: "SingList", name: "流行"},
  {url: "SingList", name: "摇滚"},
  {url: "SingList", name: "民谣"},
  {url: "SingList", name: "电子"}
];
const isLogin=computed(()=>{
  return store.state.user.isLogin
})
const recommendMessages = async () => {
  const {data: res} = await getPersonalized (8, getCookie ());
  const standardItems = res.result;
  //处理歌单数据的播放量
  standardItems.forEach (item => {
    if (item.playCount / 10000 > 1) {
      item.playCount = Math.round ((item.playCount / 10000)) + "万";
    } else {
      item.playCount = item.playCount.toString ();
    }
  });
  return standardItems;
};
let standardItems = reactive (await recommendMessages ());
const UpdateTheRecommendedPlaylist = async () => {
  standardItems = reactive (await recommendMessages ());
};
const {data: album} = await getAlbumList (10);
const standardAlbums = album.products;
// let keyMap = {
//   "coverUrl": "picUrl"
// };
// standardAlbums.forEach (item => {
//   for (let key in item) {
//     let newKey = keyMap[key];
//     if (newKey) {
//       item[newKey] = item[key];
//       delete item[key];
//     }
//   }
// });
//请求榜单数据
let {data: daily} = await getList (10, 0, 1, "daily");
daily.products = daily.products.splice (10);
const dailyLists = daily.products;
let {data: weekly} = await getList (10, 0, 1, "week");
weekly.products = weekly.products.splice (10);
const weeklyLists = weekly.products;
let {data: year} = await getList (null, null, 1, "year");
const yearLists = year.products;
</script>
<template>
  <!--  <suspense>-->
  <!--    <template #default>-->
  <div class="m_recommend">
    <div class="recommend_left">
      <!--      轮播图组件-->
      <banner></banner>
      <!--      选项栏-->
      <div class="recommend_left_container">
        <recommend-nav-bar class="recommend_nav_bar"
                           :sTitle="titles"
                           mTitle="m_title"
                           mUrl="SingList"
                           :pointShow="true">
          <template v-slot:m_title>热门推荐</template>
          <template v-slot:more>
            <div class="s_more">更多</div>
          </template>
        </recommend-nav-bar>
        <recommend-list-item class="recommend-list-item"
                             :standardMessages="standardItems"></recommend-list-item>
        <recommend-nav-bar class="recommend_nav_bar"
                           mTitle="m_title"
                           mUrl="NewDiscs"
                           :pointShow="true">
          <template v-slot:m_title>新碟上架</template>
          <template v-slot:more>
            <div class="s_more">更多</div>
          </template>
        </recommend-nav-bar>
        <album-list class="recommend-list-item"
                    :standardMessages="standardAlbums"></album-list>
        <recommend-nav-bar class="recommend_nav_bar"
                           mTitle="m_title"
                           mUrl="LeaderBoard"
                           :pointShow="true">
          <template v-slot:m_title>榜单</template>
          <template v-slot:more>
            <div class="s_more">更多</div>
          </template>
        </recommend-nav-bar>
        <div class="list_container">
          <list title="日榜" :lists="dailyLists"></list>
          <list title="周榜" :lists="weeklyLists"></list>
          <list title="总榜" :lists="yearLists"></list>
        </div>
      </div>
    </div>
    <div class="recommend_right">
      <div class="recommend_right_container">
        <!--      推广app组件-->
        <download></download>
        <login-box @UpdateTheRecommendedPlaylist="UpdateTheRecommendedPlaylist"
                   v-if="isLogin===false"></login-box>
        <user-box v-else></user-box>
        <resident-singer class="resident_singer"></resident-singer>
        <popular-anchors class="resident_singer"></popular-anchors>
      </div>
    </div>
  </div>
  <!--    </template>-->
  <!--  </suspense>-->
</template>
<style scoped lang="scss">
.m_recommend {
  display: flex;

  .recommend_left {
    width: 730px;
    background-color: #fff;

    .recommend_left_container {
      padding-left: 20px;
      padding-right: 20px;


      .recommend_nav_bar {
        padding-top: 35px;

        .s_more {
          font-size: 12px;
        }
      }

      .recommend-list-item {
        padding-top: 20px;
      }

      .list_container {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .recommend_right {
    width: 250px;
    background-color: #fff;

    .recommend_right_container {
      .resident_singer {
        margin-top: 15px;
      }
    }
  }
}
</style>
