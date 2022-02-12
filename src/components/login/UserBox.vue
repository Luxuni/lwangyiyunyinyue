<script setup>
import {useStore} from "vuex";
import {computed, toRaw} from "vue";
const store = useStore ();
const userDetail = computed (() => {
  return store.state.user.userDetail;
});
</script>
<template>
  <div class="m_login_box_container">
    <div class="top_box">
      <div class="top_box_left">
        <img :src="userDetail.profile.avatarUrl" alt="">
      </div>
      <div class="top_box_right">
        <router-link :to="{name:'UserHome'}"
                     class="top_box_right_item">{{ userDetail.profile.nickname }}
        </router-link>
        <router-link :to="{name:'UserLevel'}"
                     class="top_box_right_item">LV {{ userDetail.level }}
        </router-link>
        <el-button color="#296CC3"
                   style="color: white;width: 100px"
                   size="default"
                   class="top_box_right_item">
          签到
        </el-button>
      </div>
    </div>
    <div class="bottom_box">
      <router-link :to="{name:'UserEvent'}" class="bottom_box_item">
        <strong>{{ userDetail.profile.eventCount }}</strong>
        <span>动态</span>
      </router-link>
      <router-link :to="{name:'UserFollow'}" class="bottom_box_item_middle">
        <strong>{{ userDetail.profile.follows }}</strong>
        <span>关注</span>
      </router-link>
      <router-link :to="{name:'UserFans'}" class="bottom_box_item">
        <strong>{{ userDetail.profile.followeds }}</strong>
        <span>粉丝</span>
      </router-link>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_login_box_container {
  display: grid;
  height: 185px;
  width: 250px;
  margin-top: 20px;
  grid-template-rows: 100px 65px;
  border: 1px solid #d1cdcd;

  .top_box {
    display: grid;
    grid-template-columns: 100px 150px;

    .top_box_left {
      justify-self: center;
      align-self: center;

      img {
        height: 80px;
        width: 80px;
        padding: 2px;
        border: 1px solid #d1cdcd;
      }
    }

    .top_box_right {
      justify-self: center;
      align-self: center;
      display: grid;
      grid-template-rows: repeat(3, 1fr);

      .top_box_right_item {
        justify-self: center;
        align-self: center;
        font-size: 14px;
      }
    }
  }

  .bottom_box {
    align-self: end;
    display: flex;
    justify-content: space-evenly;

    .bottom_box_item, .bottom_box_item_middle {
      display: grid;
      grid-template-rows: 30px 20px;
      padding: 0 20px;
      transition: all .2s linear;

      strong {
        font-size: 20px;
      }

      span {
        font-size: 14px;
      }

      &:hover {
        color: #296CC3
      }
    }

    .bottom_box_item_middle {
      border-right: 1px solid #d1cdcd;
      border-left: 1px solid #d1cdcd;
    }
  }
}
</style>
