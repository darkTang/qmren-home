<template>
  <div class="right">
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Links />
  </div>
</template>

<script setup lang="ts">
import Func from '@/components/func/index.vue'
import Links from '@/components/links/index.vue'
</script>


<style lang="less" scoped>
.right {
  width: 50%;
  margin-left: 0.75rem;
}
</style>