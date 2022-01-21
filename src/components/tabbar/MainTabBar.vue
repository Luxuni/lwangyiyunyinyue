<script setup>
import Logo from "@/components/main_tab_bar_item/Logo.vue";
import MainTabBarItem from "@/components/main_tab_bar_item/MainTabBarItem.vue";
import {useRoute} from "vue-router";
import {reactive, toRefs, watch} from "vue";
const messages = reactive ([
  {url: "/discover", mainContent: "发现音乐", arrow: false},
  {url: "/my", mainContent: "我的音乐", arrow: false},
  {url: "/attention", mainContent: "关注", arrow: false},
  {url: "/mall", mainContent: "商城", arrow: false},
  {url: "/musician", mainContent: "音乐人", arrow: false},
  {url: "/app", mainContent: "下载客户端", arrow: false}
]);
const messagesRefs = toRefs (messages);
const route = useRoute ();
watch (route, (newValue) => {
  messages.forEach (item => {
    item.arrow = newValue.path.includes (item.url);
  });
});
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
          <div v-show="message.url==='/app'"></div>
        </template>
      </main-tab-bar-item>
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

    div {
      height: 19px;
      width: 28px;
      background-image: url('../../assets/images/one.png');
      background-position: -190px 0;
    }
  }
}
</style>
