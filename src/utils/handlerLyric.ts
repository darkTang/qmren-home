function formatLyric(str: string) {
  const strArr = str.split('\n');
  const formatLyricList: { time: number, lrc: string; }[] = [];
  strArr.forEach(lrcStr => {
    if (lrcStr.includes('[') && lrcStr.includes(']')) {
      const temp = lrcStr.split(']');
      let time: string | number = temp[0].slice(1);
      let lrc = temp[1];
      const tempArr = time.split(/[:\.]/);
      time = +(+tempArr[0] * 60 + +tempArr[1] + '.' + tempArr[2]);
      formatLyricList.push({ time, lrc });
    }
  });
  return formatLyricList;
}

export default function (lyric: string, tlyric: string) {
  let lyricList = formatLyric(lyric);
  if (tlyric) {
    const tlyricList = formatLyric(tlyric);
    lyricList = lyricList.map(item => {
      const obj = tlyricList.find(item2 => (item2.time === item.time && item2.lrc));
      if (obj) {
        item.lrc += `（${obj.lrc}）`;
      }
      return item;
    });
  }
  return lyricList;
}