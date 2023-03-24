<template>
  <div class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <div class="link-all">
      <div
        class="wrap"
        v-for="(item, index) in linksData"
        :key="index"
        @click="jumpLink(item.link)"
      >
        <div class="item card">
          <Icon size="26">
            <component :is="item.icon" />
          </Icon>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { Link, Blog, CompactDisc, Cloud, Compass, Book, Fire } from '@vicons/fa'

let linksData = [
  {
    icon: Blog,
    name: '博客',
    link: '#',
  },
  {
    icon: Cloud,
    name: '网盘',
    link: '#',
  },
  {
    icon: CompactDisc,
    name: '音乐',
    link: 'https://webcoco.top/',
  },
  {
    icon: Compass,
    name: '起始页',
    link: '#',
  },
  {
    icon: Book,
    name: '网址集',
    link: '#',
  },
  {
    icon: Fire,
    name: '今日热榜',
    link: '#',
  },
]

const jumpLink = url => {
  window.open(url, '_blank')
}
</script>

<style lang="less" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fadeIn 0.5s;
    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }
  .link-all {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -10px;
    .wrap {
      width: 33.3%;
      padding: 0 10px;
      .item {
        width: 100%;
        height: 100px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.5s;
        &:hover {
          transform: scale(1.02);
          background: rgba(0, 0, 0, 0.4);
          transition: 0.3s; // 默认值为all
        }
        .name {
          font-size: 1.1rem;
          margin-left: 8px;
        }
        @media (min-width: 720px) and (max-width: 820px) {
          .name {
            display: none;
          }
        }
        @media (max-width: 720px) {
          height: 80px;
        }
        @media (max-width: 460px) {
          flex-direction: column;
          .name {
            font-size: 1rem;
            margin-left: 0;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>