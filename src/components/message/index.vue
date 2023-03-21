<template>
  <div class="message">
    <!-- logo -->
    <div class="logo">
      <img :src="siteLogo" alt class="logo-img" />
      <div class="name text-hidden">
        <span class="bg">{{siteUrl[0]}}</span>
        <span class="sm">.{{siteUrl[1]}}</span>
      </div>
    </div>
    <!-- 简介 -->
    <div class="description card">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <div class="text">
          <p>{{ descriptionText.hello }}</p>
          <p>{{ descriptionText.text }}</p>
        </div>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { QuoteLeft, QuoteRight } from '@vicons/fa'
import { ref } from 'vue'

// 站点信息
let siteLogo: string = import.meta.env.VITE_SITE_LOGO
let siteUrl: string[] = import.meta.env.VITE_SITE_URL.split('.')

// 简介区域文字
const descriptionText: { hello: string; text: string } = {
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
}
</script>

<style lang="less" scoped>
.message {
  .logo {
    display: flex;
    align-items: center;
    animation: fadeIn 0.5s;
    .logo-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .name {
      flex: 1;
      margin-left: 12px;
      font-family: 'Pacifico-Regular';
      transform: translateY(-8px);
      .bg {
        font-size: 5rem;
      }
      .sm {
        margin-left: 6px;
        font-size: 2rem;
      }
    }
  }
  .description {
    margin-top: 3.5rem;
    max-width: 460px;
    animation: fadeIn 0.5s;
    padding: 1rem;
    .content {
      display: flex;
      justify-content: space-between;
      .text {
        margin: 0.75rem 1rem;
        line-height: 2rem;
        margin-right: auto;
        p {
          &:nth-of-type(1) {
            font-family: 'Pacifico-Regular';
          }
        }
      }
      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
  }
}
</style>