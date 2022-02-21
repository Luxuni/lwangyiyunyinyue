<script setup>
const props = defineProps ({
  comments: {}
});
</script>
<template>
  <div class="m_comment_container"
       v-for="comment of comments"
       :key="comment.commentId">
    <img :src="comment.user.avatarUrl" alt="">
    <div class="right_container">
      <span class="user">{{ comment.user.nickname }} :</span>
      <span class="content">{{ comment.content }}</span>
      <div class="child_content" v-show="comment.beReplied.length>0">
        <div v-for="childContent of comment.beReplied">
         <span class="child_user">
           {{ childContent.user.nickname }} :
         </span>
          <span class="child_text">
           {{ childContent.content }}
          </span>
        </div>
      </div>
      <div class="time_reply">
        <span class="time">
          {{ comment.timeStr }}
        </span>
        <div class="like_reply">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan"></use>
          </svg>
          <i style="font-size:12px;"> | </i>
          <span>回复</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.m_comment_container {
  width: 676px;
  margin: 15px 17px;
  display: grid;
  grid-template-columns: 70px 606px;

  img {
    height: 50px;
    width: 50px;
  }

  .right_container {
    .user {
      margin-right: 5px;
      font-size: 12px;
      color: #0c73c2;
    }

    .content {
      font-size: 12px;
    }

    .child_content {
      margin-top: 10px;
      padding: 8px 19px;
      background-color: #f4f4f4;

      div {
        padding: 8px 19px;
        background-color: #bdc3c7;

        .child_user {
          color: #0c73c2;
          font-size: 12px
        }

        .child_text {
          font-size: 12px;
        }
      }


    }

    .time_reply {
      display: flex;
      align-items: end;
      justify-content: space-between;
      margin-top: 15px;

      .time {
        font-size: 12px
      }

      .like_reply {
        span {
          font-size: 12px
        }
      }
    }
  }
}
</style>
