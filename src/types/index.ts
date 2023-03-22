export interface playlistData {
  id: string,
  title: string,
  artist: string,
  src: string,
  lrcList: { time: number, lrc: string; }[];
}