<template>
  <div :class="store.state.mobileFuncState ? 'func mobile' : 'func'">
    <!-- 文心一言 + 音乐播放面板 -->
    <div class="left">
      <Hitokoto />
      <Music />
    </div>
    <!-- 高德天气 -->
    <div class="right card">
      <div class="time">
        <div class="date text-hidden">
          <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
          <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
          <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>
          <span class="sm-hidden">{{ currentTime.week }}</span>
        </div>
        <div class="text">
          <span>
            {{ currentTime.hour }}:{{ currentTime.minute }}:{{
            currentTime.second
            }}
          </span>
        </div>
      </div>
      <Weather />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hitokoto from '@/components/hitokoto/index.vue'
import Music from '@/components/music/index.vue'
import Weather from '@/components/weather/index.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getCurrentTime } from '@/utils/getTime'
import { useStore } from 'vuex'
const store = useStore()

let currentTime = ref({})
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = getCurrentTime()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="less" scoped>
.func {
  display: flex;
  height: 165px;
  justify-content: space-between;
  &.mobile {
    .left {
      display: contents;
    }
    .right {
      display: none;
    }
  }
  .left,
  .right {
    width: 48%;
  }
  @media (max-width: 910px) {
    .left {
      display: none;
    }
    .right {
      max-width: none;
      width: 100%;
    }
  }
  .right {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    animation: fadeIn 0.5s;
    .time {
      width: 100%;
      font-size: 1.1rem;
      text-align: center;
      .text {
        margin-top: 10px;
        font-size: 3.25rem;
        letter-spacing: 2px;
        font-family: 'UnidreamLED';
      }
    }
  }
}
</style>