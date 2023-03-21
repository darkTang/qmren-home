<template>
  <div class="animate">
    <!-- 背景 -->
    <Background />

    <!-- 主体区域 -->
    <main>
      <!-- 版心区域 -->
      <div class="container">
        <!-- 主区域 -->
        <section class="main">
          <!-- 左侧区域 -->
          <MainLeft />
          <!-- 右侧区域 -->
          <MainRight />
        </section>
        <!-- 更多设置区域 -->
        <section></section>
      </div>
    </main>
    <!-- 尾部区域 -->
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import Background from '@/components/background/index.vue'
import MainLeft from '@/views/main/MainLeft.vue'
import MainRight from '@/views/main/MainRight.vue'
import { onMounted } from 'vue'
import cursorInit from '@/utils/cursorInit'
import { helloHint } from '@/utils/getTime'

onMounted(() => {
  // 初始化鼠标样式
  cursorInit()
  // 欢迎提示
  helloHint()
  // 加载完成事件
  window.addEventListener('load', () => {
    document.body.className = ''
    let loadingBox = document.getElementById('loading-box')
    loadingBox.classList.add('loaded')
  })

  // 屏蔽右键  oncontextmenu会在鼠标右键时触发
  document.oncontextmenu = () => {
    ElMessage({
      message: '为了浏览体验，本站禁用右键',
      grouping: true,
      duration: 2000,
    })
    return false
  }
})
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .main {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

// 加载动画层
.animate {
  transform: scale(1);
  transition: all ease 1.25s;
  opacity: 1;
  filter: blur(0);
  width: 100%;
  height: 100%;
}

.loading {
  .animate {
    transform: scale(1.2);
    opacity: 0;
    fill: blur(10px);
  }
}
</style>
