<script setup>
import {computed, toRaw} from "vue";
import {ElMessage} from "element-plus";//引入element-plus的ElMessage
import {useStore} from "vuex";
const store = useStore ();
/*拿取vuex中的将要播放的歌单数据*/
const playlist = computed (() => {
  return store.state.playlist.playlist;
});
const props = defineProps ({
  passPointer: Number
});
/*改变正在播放的歌曲的style*/
const activeRow = (row) => {
  if (toRaw (row).rowIndex === props.passPointer) {
    return "background-color:#000000;color: #ffffff;";
  } else {
    return "";
  }
};
/*定义需要用到的事件*/
const emit = defineEmits (["update:passPointer"]);
/*播放指定歌单的歌曲*/
const playThis = scope => {
  emit ("update:passPointer", scope.$index);
};
/*将歌单中指定的歌曲进行删除*/
const deleteThis = scope => {
  store.commit ("playlist/DELETE_THIS", scope);//发送到vuex进行删除
  ElMessage ({//发出提示信息
    message: "成功删除",
    grouping: true,
    type: "success"
  });
  scope.row.deletePopover = false;//关闭删除弹出框
};
/*将歌单中的指定歌曲添加为我喜欢*/
const lickThis = scope => {
  ElMessage ({
    message: "已将歌曲添加为我喜欢",
    grouping: true,
    type: "success"
  });
};
</script>
<template>
  <div class="playlist_container">
    <el-scrollbar :noresizetr="true"
                  ref="scrollbar">
      <el-table :data="playlist"
                height="400"
                style="width: 100%;background-color: rgba(130, 1, 5, .5);"
                :fit="false"
                :row-style="activeRow"
                empty-text="列表里还没有歌曲哦">
        <el-table-column prop="name" label="单曲名" width="330" align="center"/>
        <el-table-column prop="ar" label="歌手" width="330" align="center"/>
        <el-table-column label="操作" width="320" align="center">
          <template v-slot:default="scope">
            <el-button color="#d63031"
                       style="color: white"
                       :circle="true"
                       size="small"
                       @click="lickThis(scope)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-woxihuande"></use>
              </svg>
            </el-button>
            <el-button color="#d63031"
                       style="color: white"
                       :circle="true"
                       size="small"
                       @click="playThis(scope)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_play"></use>
              </svg>
            </el-button>
            <el-popover trigger="click"
                        v-model:visible="scope.row.deletePopover"
                        placement="top"
                        :width="160">
              <p>你想要从歌单中删除这首歌曲嘛?</p>
              <div style="text-align: center; margin: 0">
                <el-button size="small"
                           color="#000000"
                           style="color: white"
                           @click="scope.row.deletePopover = false">取消
                </el-button>
                <el-button size="small"
                           color="#d63031"
                           style="color: white"
                           @click="deleteThis(scope)">确定
                </el-button>
              </div>
              <template #reference>
                <el-button color="#d63031"
                           style="color: white"
                           :circle="true"
                           size="small"
                           @click="scope.row.deletePopover=true">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                  </svg>
                </el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss">
.playlist_container {
  height: 400px;
  width: 980px;
}

</style>
