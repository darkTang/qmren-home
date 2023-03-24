// 音乐列表数据类型
export interface playlistData {
  id: string,
  title: string,
  artist: string,
  src: string,
  lrcList: { time: number, lrc: string; }[];
}