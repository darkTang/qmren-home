<template>
  <div :class="store.state.mobileOpenState ? 'left hidden' : 'left'">
    <!-- 信息区域：网站logo+网站简介 -->
    <Message />
    <!-- 社交链接区域 -->
    <SocialLinks />
  </div>
</template>

<script setup lang="ts">
import Message from '@/components/message/index.vue'
import SocialLinks from '@/components/social-links/index.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>



<style lang="less" scoped>
.left {
  width: 50%;
  margin-right: 10px;
  transform: translateY(20px);
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }
}
</style>