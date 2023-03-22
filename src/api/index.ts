import handlerLyric from "@/utils/handlerLyric";

// 获取社交链接数据
export const getSocialLinks = async () => {
  const res = await fetch('/socialLinks.json');
  return await res.json();
};

// 获取文心一言数据
export const getHitokoto = async () => {
  const res = await fetch('https://v1.hitokoto.cn');
  return await res.json();
};

// 获取音乐数据
export const getPlaylist = () => {
  return new Promise(async resolve => {
    const res = await fetch(`${import.meta.env.VITE_SONG_API}/playlist/track/all?id=${import.meta.env.VITE_SONG_ID}&limit=${import.meta.env.VITE_SONG_LIMIT}`);
    const { songs } = await res.json();
    const playList = songs.map(async (item: { ar: any[]; id: string; name: string; }) => {
      // 处理歌手的名字
      let artist = item.ar.reduce((pre: any, cur: { name: any; }) => {
        return pre + cur.name + ' / ';
      }, '').slice(0, -3);
      let lrcList = await getLyric(item.id);
      return {
        id: item.id,
        title: item.name,
        artist,
        src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        lrcList
      };
    });
    resolve(playList);
  });
};

// 获取歌词
export const getLyric = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_SONG_API}/lyric?id=${id}`);
  const data = await res.json();
  return handlerLyric(data.lrc.lyric, data.tlyric.lyric);
};