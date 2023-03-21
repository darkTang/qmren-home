
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