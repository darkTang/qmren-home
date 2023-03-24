import { createStore } from 'vuex';
import { getItem, setItem, removeItem, clear } from '@/utils/storage';
export default createStore({
  state: {
    musicOpenState: false,// 是否打开音乐面板
    playerState: false, // 播放/暂停
    siteStartShow: true, // 建站日期显示
    playerTitle: null, // 当前播放歌曲名
    playerArtist: null, // 当前播放歌手名
    boxOpenState: false, // 盒子开启状态
    musicIsOk: false, // 音乐是否加载完成
    musicVolume: getItem(import.meta.env.VITE_MUSIC_VOLUME_KEY) || 0.7, // 音乐音量;
    playerLrc: "歌词加载中", // 当前播放歌词
    setOpenState: false, // 设置页面开启状态
    //  0 默认壁纸 1 每日一图 2 随机风景 3 随机动漫
    coverType: getItem(import.meta.env.VITE_COVER_TYPE_KEY) || 0, // 壁纸种类
  },
  mutations: {
    // 更改歌曲数据
    setPlayerData(state, { title, artist }) {
      state.playerTitle = title;
      state.playerArtist = artist;
    },
    // 更改播放状态
    setPlayerState(state, value) {
      if (value) {
        state.playerState = false;
      } else {
        state.playerState = true;
      }
    },
    // 更改歌词
    setPlayerLrc(state, value) {
      state.playerLrc = value;
    },
  },
  getters: {
    // 获取歌曲信息
    getPlayerData(state) {
      return {
        name: state.playerTitle,
        artist: state.playerArtist,
      };
    },
    // 获取歌词
    getPlayerLrc(state) {
      return state.playerLrc;
    },
  }
});