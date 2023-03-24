<template>
  <div class="box card" @mouseenter="closeShow = true" @mouseleave="closeShow = false">
    <transition name="el-fade-in-linear">
      <CloseOne
        class="close"
        theme="filled"
        size="28"
        fill="#ffffff60"
        v-show="closeShow"
        @click="store.state.boxOpenState = false"
      />
    </transition>
    <transition name="el-fade-in-linear">
      <SettingTwo class="setting" theme="filled" size="28" fill="#ffffff60" v-show="closeShow" @click="store.state.setOpenState=true" />
    </transition>
    <div class="content">
      <TimeCapsule />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseOne, SettingTwo } from '@icon-park/vue-next'
import { ref } from 'vue'
import { useStore } from 'vuex'
import TimeCapsule from '@/components/time-capsule/index.vue'

const store = useStore()

let closeShow = ref(false)
</script>

<style lang="less" scoped>
.box {
  flex: 1;
  margin-left: 0.75rem;
  height: 80%;
  position: relative;
  animation: fadeIn 0.5s;
  &:hover {
    transform: scale(1);
  }
  .close,
  .setting {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    &:hover {
      transform: scale(1.2);
    }
    &:active {
      transform: scale(1);
    }
  }
  .setting {
    right: 56px;
  }
  .content {
    padding: 30px;
    width: 100%;
    height: 100%;
  }
}
</style>