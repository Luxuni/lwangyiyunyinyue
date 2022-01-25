<script setup>
import {defineProps, ref} from "vue";
defineProps ({
  title: {},
  lists: {}
});
</script>
<template>
  <div class="m_list_container">
    <div class="head">
      <h2>{{ title }}</h2>
      <div>
        <svg class="icon play_icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon icon-shoucangjia" aria-hidden="true">
          <use xlink:href="#icon-shoucangjia"></use>
        </svg>
      </div>
    </div>
    <div class="body">
      <ul>
        <li v-for="(list,index) of lists"
            :class="{odd:index%2===0}">
          <div class="left">
            <span :class="{index:index<3}">{{ index + 1 }}</span>
            {{ list.albumName }}
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon play_icon" aria-hidden="true">
              <use xlink:href="#icon-tian_jia"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucangjia"></use>
            </svg>
          </div>
        </li>
        <li class="more">
          <router-link :to="{name:'LeaderBoard'}">查看全部 ></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_list_container {
  margin-top: 25px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .icon {
      margin-right: 20px;
      font-size: 1.3em;
      cursor: pointer;
    }
  }

  .body {
    ul {
      display: flex;
      flex-direction: column;

      li, .odd {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        height: 35px;

        .left {
          width: 65%;
          font-size: 12px;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          span {
            display: inline-block;
            width: 20px;
            margin-right: 5px;
            font-size: 14px
          }

          .index {
            color: #B2281E;
          }
        }

        .right {
          display: none;
          transition: all .3s linear;

          .play_icon {
            margin: 0 8px 0 8px;
          }

          .icon {
            font-size: 12px;
            cursor: pointer;
          }

        }

        &:hover {
          .right {
            display: inline-block;
          }
        }
      }

      .more {
        justify-content: end;
        font-size: 12px;
        background-color: #e6dcce;
      }

      .odd {
        background-color: #e6dcce;
      }
    }
  }
}
</style>
