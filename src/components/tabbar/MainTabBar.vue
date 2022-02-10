<script setup>
import Logo from "@/components/main_tab_bar_item/Logo.vue";
import MainTabBarItem from "@/components/main_tab_bar_item/MainTabBarItem.vue";
import {useRoute} from "vue-router";
import {computed, reactive, ref, toRaw, watch} from "vue";
import {useStore} from "vuex";
import {getSearchSuggest} from "@/network/search/searchsuggest";
import {ElMessage} from "element-plus";
const store = useStore ();
const messages = reactive ([
  {url: "/discover", mainContent: "发现音乐", arrow: false},
  {url: "/my", mainContent: "我的音乐", arrow: false},
  {url: "/attention", mainContent: "关注", arrow: false},
  {url: "/mall", mainContent: "商城", arrow: false},
  {url: "/musician", mainContent: "音乐人", arrow: false},
  {url: "/app", mainContent: "下载客户端", arrow: false}
]);
const route = useRoute ();
watch (route, (newValue) => {
  messages.forEach (item => {
    item.arrow = newValue.path.includes (item.url);
  });
});
/*绑定搜索关键字*/
const search = ref (null);
const willShowLoginWindow = async () => {
  await store.commit ("user/WILL_SHOW_LOGIN_WINDOW", true);
};
const isLogin = computed (() => {
  return store.state.user.isLogin;
});
const userDetail = computed (() => {
  return store.state.user.userDetail;
});
const loadAll = async (search) => {
  const {data: result} = await getSearchSuggest (search);
  console.log (result);
  if (result.code !== 200) {
    // ElMessage ({
    //   message: "抱歉，没有查询到",
    //   grouping: true,
    //   type: "error"
    // });
    return [];

  }
  return result.result;
};
/*根据关键字查询数据*/
const querySearchAsync = async (queryString, callback) => {
  await getData (queryString).then ((result) => {
    if (queryString.length > 0) {
      const results = queryString
        ? createFilter (result?.songs)
        : [];
      callback (results);
    } else {
      callback ([]);
    }
  });
};
const getData = async (queryString) => {
  const data = await loadAll (`${queryString}`);
  return toRaw (data);
};
/*过滤器*/
const createFilter = (resultMessage) => {
  let keyMap = {
    "name": "value"
  };
  resultMessage?.forEach (item => {
    for (let key in item) {
      let newKey = keyMap[key];
      if (newKey) {
        item[newKey] = item[key];
        delete item[key];
      }
    }
  });
  // if (resultMessage[0].value === "null") return [];
  return resultMessage;
};
/*点击选中建议项时触发*/
const handleSelect = (item) => {
  store.dispatch ("playlist/getSingleUrl", item);
};
</script>
<template>
  <div class="m_top">
    <div class="m_top_items">
      <logo></logo>
      <main-tab-bar-item v-for="message of messages"
                         :url="message.url"
                         :mainContent="message.mainContent"
                         :arrow="message.arrow">
        <template v-slot:remind>
          <div class="item_hot" v-show="message.url==='/app'"></div>
        </template>
      </main-tab-bar-item>
      <!--      搜索框-->
      <div class="search_container">
        <el-autocomplete
          v-model="search"
          placeholder="请输入关键字"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect">
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </template>
        </el-autocomplete>
      </div>
      <div class="creator">
        <div>创作者中心</div>
      </div>
      <!--      登陆按钮-->
      <div class="btn_login"
           @click="willShowLoginWindow"
           v-if="isLogin===false">登陆
      </div>
      <div class="user_avatar"
           v-else>
        <img :src="userDetail.profile.avatarUrl" alt="">
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_top {
  background-color: #1B1B1B;

  .m_top_items {
    display: flex;
    width: 100vw;
    min-width: 720px;
    justify-content: center;

    .item_hot {
      height: 19px;
      width: 28px;
      background-image: url('../../assets/images/one.png');
      background-position: -190px 0;
    }

    .search_container {
      display: flex;
      align-items: center;
      padding: 0 20px 0 100px;
    }

    .creator {
      display: flex;
      align-items: center;

      div {
        height: 32px;
        width: 90px;
        text-align: center;
        line-height: 32px;
        font-size: 12px;
        color: #b2bec3;
        border-radius: 16px;
        border: 1px solid #636e72;
        transition: all .2s linear;
        cursor: pointer;

        &:hover {
          border: 1px solid #ffffff;
        }
      }
    }

    .btn_login {
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-size: 12px;
      color: #b2bec3;
      cursor: pointer;
      transition: all .2s linear;

      &:hover {
        color: #ffffff;
      }
    }

    .user_avatar {
      display: flex;
      align-items: center;
      padding: 0 20px;

      img {
        height: 30px;
        width: 30px;
        border-radius: 15px;
      }
    }
  }
}
</style>
