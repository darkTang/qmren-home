let timer: any = null;
export default function (cb: Function, delay: number) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    cb();
    timer = null;
  }, delay);
}