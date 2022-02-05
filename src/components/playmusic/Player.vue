<script setup>
import PlayList from "@/components/playmusic/PlayList.vue";
import {computed, ref, toRaw} from "vue";
import {useStore} from "vuex";
const store = useStore ();
/*拿取vuex中的将要播放的歌单数据*/
const playlist = computed (() => {
  return store.state.playlist.playlist;
});
/*定义当前播放歌曲的位置指针*/
const pointer = ref (0);
/*获取audio的DOM*/
const audio = ref (null);
/*定义播放进度条的绑定数据*/
const playingTime = ref (0);
/*定义音量条的绑定数据*/
const volume = ref (100);
/*定义播放总时长的字符串*/
const playAllTime = ref ("0:00");
/*当前播放时间*/
const playNowTime = ref ("0:00");
/*定义播放时长最小值*/
const minTime = 0;
/*定义播放时长最大值*/
const maxTime = ref (0);
/*和播放按钮的改变相关*/
const playOrPauseIcon = ref ("#icon-icon_play");
/*和音量按钮图标改变相关*/
const volumeIcon = ref ("#icon-Soundshengyin3");
/*保存用户自定义的音量大小*/
const userVolume = ref (100);
/*控制音量条的显示*/
const isVolume = ref (false);
/*定义歌曲封面是否添加旋转的类*/
const isRotate = ref (null);
/*控制播放以及播放暂停图标改变的方法*/
const play = () => {
  audio.value.play ();
  playOrPauseIcon.value = "#icon-Pause";
  isRotate.value = null;
};
/*控制暂停以及播放暂停图标改变的方法*/
const pause = () => {
  audio.value.pause ();
  playOrPauseIcon.value = "#icon-icon_play";
  isRotate.value = "animation-play-state: paused";
};
/*点击播放按钮执行播放与暂停*/
const playOrPause = () => {
  if (audio.value.paused) {
    //如果是暂停状态
    play ();
  } else {
    //如果是播放状态
    pause ();
  }
};
/*获取播放歌曲的总时长*/
const getAllTime = () => {
  maxTime.value = audio.value.duration;
  playAllTime.value = formatSeconds (audio.value.duration);
  play ();
};
/*格式化时间的方法*/
function formatSeconds (value) {
  let theTime = Math.round (value);// 秒
  let theTime1 = 0;// 分
  if (theTime > 60) {
    theTime1 = Math.floor (theTime / 60);
    theTime = theTime % 60;
    if (theTime < 10) {
      return `${theTime1}:0${theTime}`;
    }
    return `${theTime1}:${theTime}`;
  } else if (theTime < 10) {
    return `0:0${theTime}`;
  } else {
    return `0:${theTime}`;
  }
}
/*获取当前播放时间*/
const getNowTime = () => {
  playNowTime.value = formatSeconds (audio.value.currentTime);
  playingTime.value = audio.value.currentTime;
};
/*绑定音量条和系统音量的方法*/
const bindVolume = () => {
  volume.value = audio.value.volume * 100;
};
/*拖动播放条改变当前播放时间*/
const changeCurrentTime = (value) => {
  audio.value.currentTime = value;
  //既然拖动播放滑块，说明用户想要播放，则给用户播放
  if (audio.value.paused) {
    //如果是暂停状态
    play ();
  }
};
/*用户拖动音量滑块改变音量大小*/
const changeVolume = (value) => {
  audio.value.volume = value / 100;
  userVolume.value = value;
  if (value === 0) {
    volumeIcon.value = "#icon-jingyin_mian";
    userVolume.value = 20;
  } else if (value > 50) {
    volumeIcon.value = "#icon-Soundshengyin3";
  } else {
    volumeIcon.value = "#icon-Soundshengyin2";
  }
};
/*控制点击音量图标静音以及其他变化*/
const volumeSwitch = () => {
  if (audio.value.volume > 0) {
    audio.value.volume = 0;
    bindVolume ();
    volumeIcon.value = "#icon-jingyin_mian";
  } else {
    audio.value.volume = userVolume.value / 100;
    bindVolume ();
    volumeIcon.value = "#icon-Soundshengyin2";
  }
};
/*控制音量条显示的方法*/
let enterVolumeIcon = false;
let enterVolume = false;
let timing;
const mainIsShowVolume = () => {
  if (enterVolumeIcon === true) {
    isVolume.value = true;
  } else {
    if (timing) {
      clearTimeout (timing);
    }
    timing = setTimeout (() => {
      isVolume.value = enterVolume === true;
    }, 2000);
  }
};
const showVolumeIcon = () => {
  enterVolumeIcon = true;
  mainIsShowVolume ();
};
const hideVolumeIcon = () => {
  enterVolumeIcon = false;
  mainIsShowVolume ();
};
const showVolume = () => {
  enterVolume = true;
  mainIsShowVolume ();
};
const hideVolume = () => {
  enterVolume = false;
  mainIsShowVolume ();
};
/*切换上一首以及下一首的两个方法*/
const previousSong = () => {
  if (pointer.value === 0) {
    pointer.value = toRaw (store.state.playlist.playlist).length - 1;
  } else {
    pointer.value -= 1;
  }
};
const nextSong = () => {
  if (pointer.value === toRaw (store.state.playlist.playlist).length - 1) {
    pointer.value = 0;
  } else {
    pointer.value += 1;
  }
};
const passPointer = value => {
  play ();
};
/*显示播放歌单*/
const isShowPlaylist = ref (false);
const showPlaylist = () => {
  isShowPlaylist.value ? isShowPlaylist.value = false : isShowPlaylist.value = true;
};
</script>
<template>
  <div>
    <audio
      ref="audio"
      @durationchange="getAllTime"
      @timeupdate="getNowTime"
      :src="playlist[pointer]?.url">
    </audio>
    <div class="audio-container">
      <play-list class="playlist"
                 v-model:passPointer="pointer"
                 @update:passPointer="passPointer"
                 v-show="isShowPlaylist"></play-list>
      <!--      当前歌曲图片-->
      <img v-show="playlist.length>0"
           ref="img"
           :style="isRotate"
           :src="playlist[pointer]?.picUrl" alt="">
      <!--      歌名-->
      <span v-show="playlist.length>0"
            class="the_song_name">{{ playlist[pointer]?.name }}</span>
      <!--      分割符号-->
      <span v-show="playlist.length>0"
            class="segmentation">--</span>
      <!--      作者-->
      <span v-show="playlist.length>0"
            class="the_artists">{{ playlist[pointer]?.ar }}</span>
      <!--      上一首-->
      <svg class="icon previous_song"
           aria-hidden="true"
           @click="previousSong">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <!--      播放或者暂停按钮-->
      <svg class="icon whether_player"
           aria-hidden="true"
           @click="playOrPause">
        <use :xlink:href="playOrPauseIcon"></use>
      </svg>
      <!--      下一首-->
      <svg class="icon next_song"
           aria-hidden="true"
           @click="nextSong">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <!--      当前播放进度/歌曲总时长-->
      <el-tag class="max_time"
              type="info"
              effect="plain">{{ playNowTime }}
      </el-tag>
      <!--      播放进度条-->
      <el-slider class="playback_progress"
                 v-model="playingTime"
                 :min="minTime"
                 :max="maxTime"
                 :format-tooltip="formatSeconds"
                 @change="changeCurrentTime"
      ></el-slider>
      <!--      当前播放进度/歌曲总时长-->
      <el-tag class="max_time"
              type="info"
              effect="plain">{{ playAllTime }}
      </el-tag>
      <!--      播放歌单-->
      <svg class="icon playlist_icon" aria-hidden="true" @click="showPlaylist">
        <use xlink:href="#icon-yinlegedanyinfu"></use>
      </svg>
      <div class="sound_control"
           @mouseenter="showVolumeIcon"
           @mouseleave="hideVolumeIcon">
        <!--      静音按钮-->
        <svg class="icon mute"
             aria-hidden="true"
             @click="volumeSwitch">
          <use :xlink:href="volumeIcon"></use>
        </svg>
        <!--      音量条-->
        <el-slider
          @mouseenter="showVolume"
          @mouseleave="hideVolume"
          v-show="isVolume"
          class="volume_bar"
          v-model="volume"
          vertical
          height="100px"
          @input="changeVolume">
        </el-slider>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.audio-container {
  display: flex;
  position: relative;
  width: 100vw;
  height: 60px;
  background-color: #9B1509;
  justify-content: center;
  align-items: center;

  .playlist {
    position: absolute;
    bottom: 60px;
  }

  .previous_song, .whether_player, .next_song, .playlist_icon {
    padding: 5px;
    margin: 0 10px;
    font-size: 2.3em;
    border-radius: 16px;
    transition: all 0.2s linear;
    cursor: pointer;
    color: #000000;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .the_song_name, .the_artists {
    width: 75px;
    margin: 0 10px;
    text-align: center;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .segmentation {
    width: 30px;
    text-align: center;
  }

  img {
    height: 40px;
    width: 40px;
    margin: 0 10px;
    border-radius: 20px;
    animation: 5s rotate infinite linear;
    animation-play-state: running;
  }

  .playback_progress {
    width: 200px;
    margin: 0 10px;
  }

  .max_time {
    margin: 10px;
  }

  .sound_control {
    position: relative;
    margin: 0 20px;
    height: 60px;
    //width: 1px;

    .mute {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2em;
      cursor: pointer;

    }

    .volume_bar {
      position: absolute;
      top: -85px;
      left: -19px;
      z-index: 999999;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
