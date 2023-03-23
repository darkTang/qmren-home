import { ElMessage } from "element-plus";

// 欢迎提示
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

// 时钟
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

// 时光胶囊
export const getTimeCapsule = () => {
  // 日进度
  let datodayStartDatete = new Date(new Date().toLocaleDateString()).getTime();
  let todayPassHours = (Date.now() - datodayStartDatete) / 1000 / 60 / 60;
  let todayPassHoursPercent = (todayPassHours / 24) * 100;
  // 周进度
  let weeks = [7, 1, 2, 3, 4, 5, 6];
  let weekDay = weeks[new Date().getDay()];
  let weekDayPassPercent = (weekDay / 7) * 100;
  // 月进度
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  // 可以获取到特定月份有多少天
  let monthAll = new Date(year, month, 0).getDate();
  let date = new Date().getDate();
  let monthPassPercent = (date / monthAll) * 100;
  // 年进度
  let yearPassPercent = (month / 12) * 100;
  return {
    day: {
      start: Math.floor(todayPassHours),
      pass: Math.floor(todayPassHoursPercent)
    },
    week: {
      start: weekDay,
      pass: Math.floor(weekDayPassPercent),
    },
    month: {
      start: date,
      pass: Math.floor(monthPassPercent),
    },
    year: {
      start: month - 1,
      pass: Math.floor(yearPassPercent),
    }
  };
};

// 建站日期统计
export const siteDateStatistics = (startDate: Date) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  if (differenceInYears >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInYears)} 年 ${Math.floor(differenceInMonths % 12)} 月 ${Math.round(differenceInDays % 30)} 天`;
  } else if (differenceInMonths >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInMonths)} 月 ${Math.round(differenceInDays % 30)} 天`;
  } else {
    return `本站已经苟活了 ${Math.round(differenceInDays)} 天`;
  }
};