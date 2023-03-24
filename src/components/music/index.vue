<template>
  <!-- 音乐控制面板 -->
  <div
    class="music"
    v-show="store.state.musicOpenState"
    @mouseenter="volumeShow = true"
    @mouseleave="volumeShow = false"
  >
    <!-- 按钮： 音乐列表+回到一言-->
    <div class="btns">
      <span @click="musicListShow = true">音乐列表</span>
      <span @click="store.state.musicOpenState=false">回到一言</span>
    </div>
    <!-- 音乐控制：上一首+下一首+播放/暂停 -->
    <div class="control">
      <go-start theme="filled" size="30" fill="#efefef" @click="changeMusicIndex(-1)" />
      <div class="state" @click="changePlayerState">
        <play-one theme="filled" size="50" fill="#efefef" v-show="!store.state.playerState" />
        <pause theme="filled" size="50" fill="#efefef" v-show="store.state.playerState" />
      </div>
      <go-end theme="filled" size="30" fill="#efefef" @click="changeMusicIndex(1)" />
    </div>
    <!-- 菜单：曲名+歌手名+音量控制 -->
    <div class="menu">
      <div class="name" v-show="!volumeShow">
        <span>
          {{
          store.getters.getPlayerData.name
          ? store.getters.getPlayerData.name + " - " + store.getters.getPlayerData.artist
          : "未播放音乐"
          }}
        </span>
      </div>
      <div class="volume" v-show="volumeShow">
        <div class="icon">
          <volume-mute theme="filled" size="24" fill="#efefef" v-if="volumeNum == 0" />
          <volume-small
            theme="filled"
            size="24"
            fill="#efefef"
            v-else-if="volumeNum > 0 && volumeNum < 0.7"
          />
          <volume-notice theme="filled" size="24" fill="#efefef" v-else />
        </div>
        <el-slider v-model="volumeNum" :show-tooltip="false" :min="0" :max="1" :step="0.01" />
      </div>
    </div>
  </div>

  <!-- 音乐列表弹窗 -->
  <Transition name="fade">
    <div class="music-list" v-show="musicListShow" @click="musicListShow = false">
      <Transition name="zoom" v-show="musicListShow">
        <div class="list" @click.stop>
          <close-one
            class="close"
            theme="filled"
            size="28"
            fill="#ffffff60"
            @click="musicListShow = false"
          />
          <!-- 播放器组件 -->
          <Player ref="player" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>




<script setup lang="ts">
import { GoStart, PlayOne, Pause, GoEnd, CloseOne, VolumeMute, VolumeSmall, VolumeNotice } from '@icon-park/vue-next'
import Player from '@/components/player/index.vue'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { setItem } from '@/utils/storage'
const store = useStore()

// 音量数据
let volumeShow = ref<boolean>(false)
let volumeNum = ref<number>(store.state.musicVolume ? store.state.musicVolume : 0.7)

// 播放列表数据
let musicListShow = ref(false)

let player = ref(null)

// 改变播放器状态
const changePlayerState = () => { 
  player.value.toggle() 
}

// 切换上下曲
const changeMusicIndex = (type: number) => {
  player.value.changeSong(type)
}

onMounted(() => {
  window.addEventListener('keyup', (e) => {
    if(e.code === 'Space') {    
      changePlayerState()
    }
  })
})

// 监听音量变化
watch(volumeNum, newVal => {
  setItem(import.meta.env.VITE_MUSIC_VOLUME_KEY, newVal)
  player.value.changeVolume(newVal)
})
</script>

<style lang="less" scoped>
.music {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 6px;
  background-color: #00000040;
  backdrop-filter: blur(10px);
  transform: scale(1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  animation: fadeIn 0.5s;
  .btns {
    display: flex;
    align-items: center;
    span {
      background: #ffffff26;
      padding: 2px 8px;
      border-radius: 6px;
      margin: 0px 6px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      &:hover {
        background: #ffffff4d;
      }
    }
  }
  .control {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .state {
      .i-icon {
        width: 50px;
        height: 50px;
        display: block;
      }
    }
    .i-icon {
      width: 36px;
      height: 36px;
      display: flex;
      border-radius: 6px;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transform: scale(1);
      &:hover {
        background: #ffffff33;
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
  .menu {
    width: 100%;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      width: 100%;
      text-align: center;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      animation: fadeIn 0.3s;
    }
    .volume {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 12px;
      animation: fadeIn 0.3s;
      .icon {
        margin-right: 12px;
        span {
          width: 24px;
          height: 24px;
          display: block;
        }
      }
      :deep(*) {
        transition: none;
      }
      :deep(.el-slider__button) {
        transition: 0.3s;
      }
      .el-slider {
        margin-right: 12px;
        --el-slider-main-bg-color: #efefef;
        --el-slider-runway-bg-color: #ffffff40;
        --el-slider-button-size: 16px;
      }
    }
  }
}

.music-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  backdrop-filter: blur(20px);
  z-index: 1;
  .list {
    position: absolute;
    width: 640px;
    height: 600px;
    top: calc(50% - 300px);
    left: calc(50% - 320px);
    background-color: #ffffff66;
    border-radius: 6px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
      display: block;
      &:hover {
        transform: scale(1.2);
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

.fade-enter-active {
  animation: fadeIn 0.3s ease-in-out;
}
.fade-leave-active {
  animation: fadeIn 0.3s ease-in-out reverse;
}
.zoom-enter-active {
  animation: zoom 0.4s ease-in-out;
}
.zoom-leave-active {
  animation: zoom 0.3s ease-in-out reverse;
}

@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>