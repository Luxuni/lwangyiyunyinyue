<script setup>
const menuMessages = [
  {title: "我的主页", icon: "#icon-yonghuming", url: ""},
  {title: "我的消息", icon: "#icon-xiaoxi", url: ""},
  {title: "我的等级", icon: "#icon-dengji", url: ""},
  {title: "VIP会员", icon: "#icon-huiyuandengjidengjizuanshi", url: ""},
  {title: "个人设置", icon: "#icon-shezhi1", url: ""},
  {title: "实名认证", icon: "#icon-shimingrenzheng", url: ""},
  {title: "退出", icon: "#icon-tuichu", url: ""}
];
</script>
<template>
  <div class="main_menu_container">
    <ul>
      <li v-for="menuMessage of menuMessages">
        <router-link to="">
          <div>
            <svg class="icon" aria-hidden="true" style="color: #fff;">
              <use :xlink:href="menuMessage.icon"></use>
            </svg>
            <span>{{ menuMessage.title }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.main_menu_container {
  width: 170px;
  height: 232px;
  background-color: #2d3436;

  ul {
    li {
      display: flex;
      height: 33px;
      justify-content: space-around;
      align-items: center;
      transition: all .2s linear;

      &:hover {
        background-color: #636e72;
        transform: translateY(-2px);

        div {
          span {
            color: #ffffff;
          }
        }
      }

      div {
        span {
          display: inline-block;
          width: 64px;
          margin-left: 10px;
          font-size: 14px;
          color: #b2bec3;
          transition: all .2s linear;
        }
      }
    }
  }
}
</style>
