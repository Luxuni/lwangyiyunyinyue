<script setup>
import {computed, ref, watch} from "vue";
import {loginInterface} from "@/network/login/login";
import {setCookie} from "@/until/cookie";
import {useStore} from "vuex";
const store = useStore ();
const isShowLoginWindow = computed (() => {
  return store.state.user.isShowLoginWindow;
});
let isShow = ref (isShowLoginWindow.value);
const willShowLoginWindow = async () => {
  isShow.value = true;
};
const hiddenShowLoginWindow = async () => {
  isShow.value = false;
};
const username = ref ("15755967688");
const password = ref ("200223252@lml");
const emit = defineEmits (["UpdateTheRecommendedPlaylist"]);
const willLogin = async () => {
  isShow.value = false;
  const {data: res} = await loginInterface (username.value, password.value);
  setCookie (res.cookie);//保存cookie
  await store.dispatch ("user/getUserMessage", res.account.id);
  await hiddenShowLoginWindow ();
  emit ("UpdateTheRecommendedPlaylist");
};
watch (isShow, async (newValue) => {
  await store.commit ("user/WILL_SHOW_LOGIN_WINDOW", newValue);
});
watch (isShowLoginWindow, (newValue) => {
  isShow.value = newValue;
});
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
    <!--    弹出用户登陆窗口-->
    <el-dialog v-model="isShow"
               title="欢迎登陆"
               width="400px"
               center
               @close="hiddenShowLoginWindow">
    <span>
      <el-input v-model="username" class="w-50 m-2" placeholder="请输入用户名">
        <template #prefix>
          <el-icon class="el-input__icon">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-yonghuming"></use>
            </svg>
          </el-icon>
        </template>
      </el-input>
      <el-input v-model="password" class="w-50 m-2" placeholder="请输入密码">
        <template #prefix>
          <el-icon class="el-input__icon">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-mima"></use>
            </svg>
          </el-icon>
        </template>
      </el-input>
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button color="#ffffff"
                   style="color: #000000"
                   @click="hiddenShowLoginWindow">取消</el-button>
        <el-button color="#9B1509"
                   style="color: white"
                   @click="willLogin">确认</el-button>
      </span>
      </template>
    </el-dialog>
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
