<template>
  <div class="func">
    <!-- 文心一言 + 音乐播放面板 -->
    <div class="left card">
      <Hitokoto />
      <Music />
    </div>
    <!-- 高德天气 -->
    <div class="right card"></div>
  </div>
</template>

<script setup lang="ts">
import Hitokoto from '@/components/hitokoto/index.vue'
import Music from '@/components/music/index.vue'
</script>

<style lang="less" scoped>
.func {
  display: flex;
  height: 165px;
  justify-content: space-between;
  .left,
  .right {
    width: 48%;
  }
}
</style>