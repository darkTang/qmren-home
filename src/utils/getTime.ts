import { ElMessage } from "element-plus";

export const helloHint = () => {
  const hour: number = new Date().getHours();
  let hello: string = '';
  if (hour < 6) {
    hello = "凌晨好";
  } else if (hour < 9) {
    hello = "早上好";
  } else if (hour < 12) {
    hello = "上午好";
  } else if (hour < 14) {
    hello = "中午好";
  } else if (hour < 17) {
    hello = "下午好";
  } else if (hour < 19) {
    hello = "傍晚好";
  } else if (hour < 22) {
    hello = "晚上好";
  } else {
    hello = "夜深了";
  }
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${hello}</strong> 欢迎来到我的主页`,
  });
};

function padZero(n: number) {
  return n > 9 ? n : '0' + n;
}

export const getCurrentTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const week = weeks[date.getDay()];
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());
  return {
    year,
    month,
    day,
    week,
    hour,
    minute,
    second
  };
};