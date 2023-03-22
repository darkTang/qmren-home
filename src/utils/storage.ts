export const getItem = (key: string) => {
  const data: string = localStorage.getItem(key)!;
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const setItem = (key: string, value: any) => {
  if (typeof value === 'object' && value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};