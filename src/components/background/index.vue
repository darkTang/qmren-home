<template>
  <div class="cover">
    <img class="bg" :src="bgUrl" alt="cover" />
    <div class="mask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let bgUrl = ref<string>('') // 壁纸链接
bgUrl = `/images/background${Math.floor(Math.random() * 10 + 1)}.webp`
</script>

<style lang="less" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;
  .bg {
    transform: scale(1);
    filter: blur(0);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1.5s ease 0s;
    backface-visibility: hidden;
  }
  .mask {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
    transition: 1.5s;
  }
}

// 加载时动画
.loading {
  .cover {
    .bg {
      transform: scale(1.1);
      filter: blur(10px);
    }
    .gray {
      opacity: 0;
    }
  }
}
</style>