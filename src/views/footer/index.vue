<template>
  <footer>
    <div class="lrc" v-show="store.state.playerState">
      <music-one theme="filled" size="18" fill="#efefef" />
      <span
        class="lrc-text"
      >{{ store.getters.getPlayerLrc ? store.getters.getPlayerLrc : "这句没有歌词" }}</span>
      <music-one theme="filled" size="18" fill="#efefef" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MusicOne } from '@icon-park/vue-next'
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
  z-index: 10;
  animation: fadeIn 0.5s;
  .lrc {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
    .lrc-text {
      margin: 0 8px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
    .i-icon {
      width: 18px;
      height: 18px;
      display: inherit;
    }
  }
}
</style>