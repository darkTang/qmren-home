<template>
  <div class="animate">
    <!-- 背景 -->
    <Background />

    <!-- 主体区域 -->
    <main>
      <!-- 版心区域 -->
      <div class="container">
        <!-- 主区域 -->
        <section class="main" v-show="!store.state.setOpenState">
          <!-- 左侧区域 -->
          <MainLeft />
          <!-- 右侧区域 -->
          <MainRight v-show="!store.state.boxOpenState" />
          <!-- 右侧盒子 -->
          <Box v-show="store.state.boxOpenState" />
        </section>
        <!-- 更多设置区域 -->
        <section
          v-show="store.state.setOpenState"
          class="more"
          @click="store.state.setOpenState = false"
        >
          <MoreSet />
        </section>
      </div>

      <!-- 移动端菜单按钮 -->
      <Icon
        class="menu"
        size="24"
        @click="store.state.mobileOpenState = !store.state.mobileOpenState"
      >
        <component :is="store.state.mobileOpenState ? CloseSmall : HamburgerButton" />
      </Icon>
    </main>
    <!-- 尾部区域 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Background from '@/components/background/index.vue'
import MainLeft from '@/views/main/MainLeft.vue'
import MainRight from '@/views/main/MainRight.vue'
import Footer from '@/views/footer/index.vue'
import Box from '@/views/box/index.vue'
import MoreSet from '@/views/more-set/index.vue'
import { onBeforeUnmount, onMounted, watch } from 'vue'
import cursorInit from '@/utils/cursorInit'
import { Icon } from '@vicons/utils'
import { HamburgerButton, CloseSmall } from '@icon-park/vue-next'
import { helloHint } from '@/utils/getTime'
import { useStore } from 'vuex'
const store = useStore()

const getWidth = () => {
  store.commit('setInnerWidth', window.innerWidth)
}

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
// 监听当前页面宽度
getWidth()
window.addEventListener('resize', getWidth)

// 监听宽度变化
watch(
  () => store.state.innerWidth,
  value => {
    if (value < 990) {
      store.state.boxOpenState = false
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', getWidth)
})
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
    .main {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fadeIn;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    transition: all 0.3s;
    animation: fadeIn 0.5s;
    &:active {
      transform: scale(0.95);
    }
    .i-icon {
      transform: translateY(2px);
    }
    @media (min-width: 720px) {
      display: none;
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
