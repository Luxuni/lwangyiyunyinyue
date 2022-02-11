<script setup>
import {defineProps, ref} from "vue";
import {useStore} from "vuex";
const store = useStore ();
const props = defineProps ({
  title: {},
  lists: {}
});
const willPlay = list => {
  console.log (list);
  let keyMap = {
    "albumId": "id"
  };
  for (let key in list) {
    let newKey = keyMap[key];
    if (newKey) {
      list[newKey] = list[key];
      delete list[key];
    }
  }
  store.dispatch('playlist/processPlaylist',list)
};
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
            <svg class="icon" aria-hidden="true" @click="willPlay(list)">
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
          <router-link :to="{name:'LeaderBoard'}"><span>查看全部 ></span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_list_container {
  margin: 25px -1px 0 -1px;
  background-color: #ede4df;
  border: 1px solid #d1cdcd;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 10px;

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
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        background-color: #e6dcce;
        padding: 10px;
        height: 35px;
      }

      .odd {
        background-color: #e6dcce;
      }
    }
  }
}
</style>
