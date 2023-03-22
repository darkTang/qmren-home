<template>
  <div class="player">
    <!-- 播放器主体区域：曲名+歌手名+歌词 -->
    <div class="player-info">
      <!-- 歌曲信息 -->
      <div class="player-music">
        <span class="player-title">{{store.getters.getPlayerData.name}}</span>
        <span class="player-author">{{store.getters.getPlayerData.artist}}</span>
      </div>
      <!-- 歌词 -->
      <div class="player-lrc">
        <div class="player-lrc-contents" v-if="playlist[playingIndex]">
          <p v-for="(item, index) in playlist[playingIndex].lrcList" :key="index">{{item.lrc}}</p>
        </div>
      </div>
    </div>
    <audio :src="songUrl" ref="audio"></audio>
    <!-- 歌曲列表 -->
    <div class="player-list">
      <ol>
        <li
          v-for="(item, index) in playlist"
          :key="item&&item.id"
          :class="{'player-list-light': playingIndex === index}"
          @click="play(index, item)"
        >
          <span class="player-list-cur"></span>
          <span class="player-list-index">{{index+1}}</span>
          <span class="player-list-title">{{item&&item.title}}</span>
          <span class="player-list-author">{{item&&item.artist}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPlaylist } from '@/api'
import { AudioHTMLAttributes, h, nextTick, onMounted, reactive, ref } from 'vue'
import { playlistData } from '@/types'
import { useStore } from 'vuex'
import { MusicOne, PlayWrong } from '@icon-park/vue-next'
const store = useStore()
// 播放列表数据
let playlist = reactive<playlistData[]>([])

let audio = ref<HTMLAudioElement>(null)
let songUrl = ref('')
let playingIndex = ref(-1)
let playlistCount = ref(0)

// 播放
const play = (index: number, item: playlistData) => {
  playingIndex.value = index
  store.state.playerState = true
  songUrl.value = item.src
  store.commit('setPlayerData', { title: item.title, artist: item.artist })
  nextTick(() => {
    audio.value.play()
    ElMessage({
      message: store.getters.getPlayerData.name + ' - ' + store.getters.getPlayerData.artist,
      grouping: true,
      icon: h(MusicOne, {
        theme: 'filled',
        fill: '#efefef',
      }),
    })
  })
}

// 播放暂停
const toggle = () => {
  if (audio.value.paused) {
    audio.value.play()
    ElMessage({
      message: store.getters.getPlayerData.name + ' - ' + store.getters.getPlayerData.artist,
      grouping: true,
      icon: h(MusicOne, {
        theme: 'filled',
        fill: '#efefef',
      }),
    })
  } else {
    audio.value.pause()
  }
  store.commit('setPlayerState', audio.value.paused)
}

// 切换曲目
const changeSong = (type: number) => {
  playingIndex.value += type
  if (playingIndex.value < 0) {
    playingIndex.value = playlistCount.value - 1
  } else if (playingIndex.value >= playlistCount.value) {
    playingIndex.value = 0
  }
  play(playingIndex.value, playlist[playingIndex.value])
}

// 音量调节
const changeVolume = (value: number) => {
  audio.value.volume = value
}

// 找到播放歌词对应的索引
const findIndex = (): number => {
  // 播放器当前时间
  let curTime = audio.value.currentTime
  const playingLrcList = playlist[playingIndex.value].lrcList
  for (var i = 0; i < playingLrcList.length; i++) {
    if (curTime < playingLrcList[i].time) {
      return i - 1
    }
  }
  // 找遍了都没找到（说明播放到最后一句）
  return playingLrcList.length - 1
}

// // 音频时间更新
const onTimeUp = () => {
  nextTick(() => {
    audio.value.ontimeupdate = () => {
      let index = findIndex()
      const lrcContents = document.querySelector('.player-lrc-contents') as HTMLDivElement
      let p = lrcContents.querySelector('.player-lrc-current')
      if (p) {
        p.classList.remove('player-lrc-current')
      }
      p = lrcContents.children[index] as HTMLParagraphElement
      store.commit('setPlayerLrc', p.innerHTML)
      if (p) {
        p.classList.add('player-lrc-current')
      }
      lrcContents.style.transform = `translateY(-${index * 16}px)`
    }
  })
}

onMounted(() => {
  nextTick(() => {
    try {
      getPlaylist().then(res => {
        playlistCount.value = res.length
        changeVolume(store.state.musicVolume)
        playingIndex.value = Math.floor(Math.random() * res.length)
        onTimeUp()
        res.forEach((item, i) => {
          item.then(data => {
            playlist[i] = data
          })
        })
        // 初始化曲目
        res[playingIndex.value].then(playingObj => {
          songUrl.value = playingObj.src
          store.commit('setPlayerData', { title: playingObj.title, artist: playingObj.artist })
          // 更改播放器加载状态
          store.state.musicIsOk = true
        })
      })
    } catch (error) {
      ElMessage({
        message: '播放器加载失败',
        grouping: true,
        icon: h(PlayWrong, {
          theme: 'filled',
          fill: '#efefef',
        }),
      })
    }
  })
})

defineExpose({ toggle, changeSong, changeVolume })
</script>



<style lang="less" scoped>
.player {
  width: 80%;
  background: transparent;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  .player-info {
    height: 90px;
    border-bottom: 1px solid #e9e9e9;
    background-color: rgba(255, 255, 255, 0.2509803922);
    border-color: transparent !important;
    padding: 10px 7px 0 7px;
    display: flex;
    flex-direction: column;
    .player-music {
      .player-title {
        font-size: 16px;
        margin-right: 6px;
      }
      .player-author {
        color: #efefef;
        font-size: 12px;
      }
    }
    .player-lrc {
      text-align: left;
      margin: 4px 0 6px 6px;
      height: 43px;
      overflow-y: hidden;
      .player-lrc-contents {
        width: 100%;
        transform: translateY(0px);
        transition: all 0.5s ease-out;
        p {
          color: #efefef;
          font-size: 12px;
          &.player-lrc-current {
            font-size: 0.95rem;
            margin-bottom: 4px !important;
            color: #fff;
          }
        }
      }
    }
  }
  .player-list {
    max-height: 420px;
    margin-top: 6px;
    overflow: hidden;
    ol {
      max-height: 420px;
      overflow-y: auto;
      li {
        position: relative;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        overflow: hidden;
        margin: 0;
        text-align: start;
        display: flex;
        border-radius: 6px;
        &:hover {
          background: rgba(255, 255, 255, 0.2509803922);
        }
        &.player-list-light {
          background: rgba(255, 255, 255, 0.2509803922);
          .player-list-cur {
            background: rgb(239, 239, 239);
            border-radius: 6px;
            width: 3px;
            height: 22px;
            position: absolute;
            left: 0;
            top: 5px;
            transition: background-color 0.3s;
          }
        }
        .player-list-index {
          color: #efefef;
          margin-right: 12px;
        }
        .player-list-title {
          color: #fff;
          flex: 1; // 1 1 auto
        }
        .player-list-author {
          color: #efefef;
        }
      }
    }
  }
}
</style>