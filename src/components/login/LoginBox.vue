<script setup>
import {useStore} from "vuex";
const store = useStore ();
const willShowLoginWindow = async () => {
  await store.commit ("user/WILL_SHOW_LOGIN_WINDOW", true);
};
</script>
<template>
  <div class="m_login_box_container">
    <p class="content">
      登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
    </p>
    <button class="login_btn"
            @click="willShowLoginWindow">
      用户登陆
    </button>
  </div>
</template>
<style scoped lang="scss">
.m_login_box_container {
  height: 126px;
  width: 250px;
  padding-top: 20px;

  .content {
    margin: 0 22.5px;
    padding: 16px 0;
    font-size: 12px;
    color: #666;
  }

  .login_btn {
    height: 31px;
    width: 100px;
    margin: 0 75px;
    color: #fff;
    border-radius: 7px;
    background-color: #b33120;
    transition: all .2s linear;

    &:hover {
      background-color: #ce220d;
    }
  }
}
</style>
