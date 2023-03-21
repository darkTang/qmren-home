<template>
  <div
    class="hitokoto"
    @mouseenter="openMusicShow = true"
    @mouseleave="openMusicShow = false"
    @click.stop
  >
    <!-- 打开音乐面板 -->
    <Transition name="fadeIn">
      <div class="open-music" v-show="openMusicShow">
        <music-menu theme="filled" size="18" fill="#efefef" />
        <span>打开音乐播放器</span>
      </div>
    </Transition>
    <!-- 一言内容 -->
    <div class="content" @click="updateHitokoto">
      <p class="text">{{hitokotoData.text}}</p>
      <p class="from">-「&nbsp;{{hitokotoData.from}}&nbsp;」</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHitokoto } from '@/api'
import { MusicMenu, Error } from '@icon-park/vue-next'
import { h, onMounted, reactive, ref } from 'vue'
import debounce from '@/utils/debounce'

// 切换音乐面板的显示与隐藏
let openMusicShow = ref<boolean>(false)

// 文心一言数据
const hitokotoData = reactive({
  text: '这里应该显示一句话',
  from: '明',
})

// 获取文心一言数据
const getHitokotoData = () => {
  getHitokoto()
    .then(res => {
      hitokotoData.text = res.hitokoto
      hitokotoData.from = res.from
    })
    .catch(err => {
      ElMessage({
        message: '一言获取失败',
        icon: h(Error, {
          theme: 'filled',
          fill: '#efefef',
        }),
      })
    })
}

// 更新文心一言数据
const updateHitokoto = () => {
  hitokotoData.text = '新的一言正在赶来的路上'
  hitokotoData.from = '来源加载中'
  // 防抖
  debounce(getHitokotoData, 500)
}

onMounted(() => {
  getHitokotoData()
})
</script>

<style lang="less" scoped>
.hitokoto {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  .open-music {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000026;
    padding: 4px 0;
    border-radius: 8px 8px 0 0;
    .i-icon {
      width: 18px;
      height: 18px;
      display: block;
      margin-right: 8px;
    }
    span {
      font-size: 0.95rem;
    }
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .text {
      font-size: 1.1rem;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .from {
      margin-top: 10px;
      font-weight: bold;
      align-self: flex-end;
      font-size: 1.1rem;
    }
  }
}

.fadeIn-enter-active {
  animation: fadeIn 0.35s linear;
}
.fadeIn-leave-active {
  animation: fadeIn 0.35s linear reverse;
}
</style>