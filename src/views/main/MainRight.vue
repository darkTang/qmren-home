<template>
  <div :class="store.state.mobileOpenState ? 'right' : 'right hidden'">
    <!-- 移动端 Logo -->
    <div class="logo text-hidden" @click="store.mobileFuncState = !store.mobileFuncState">
      <span class="bg">{{ siteUrl[0] }}</span>
      <span class="sm">.{{ siteUrl[1] }}</span>
    </div>
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Links />
  </div>
</template>

<script setup lang="ts">
import Func from '@/components/func/index.vue'
import Links from '@/components/links/index.vue'
import { useStore } from 'vuex'

const store = useStore()
// 站点链接
let siteUrl = import.meta.env.VITE_SITE_URL.split('.')
</script>


<style lang="less" scoped>
.right {
  width: 50%;
  margin-left: 0.75rem;
  .logo {
    width: 80%;
    font-family: 'Pacifico-Regular';
    font-size: 1.75rem;
    position: fixed;
    top: 6%;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;
    animation: fadeIn;
    &:active {
      transform: scale(0.95);
    }
    @media (min-width: 720px) {
      display: none;
    }
  }
  @media (max-width: 720px) {
    margin-left: 0;
    width: 100%;
    &.hidden {
      display: none;
    }
  }
}
</style>