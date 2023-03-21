class Cursor {
  private cursor: HTMLDivElement | null = null;
  private pos: Record<string, any> = { prev: null, curr: null };
  constructor() {
    this.create();
    this.init();
    this.render();
  }

  move(x: number, y: number) {
    this.cursor!.style.left = x + 'px';
    this.cursor!.style.top = y + 'px';
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement('div') as HTMLDivElement;
      this.cursor.id = 'cursor';
      this.cursor.classList.add('hidden');
      document.body.appendChild(this.cursor);
    }
    const style = document.createElement('style');
    style.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
    document.body.appendChild(style);
  }

  init() {
    document.onmousemove = (e) => {
      this.pos.curr === null && this.move(e.clientX - 8, e.clientY - 8);
      // 拿到最新的位置
      this.pos.curr = {
        x: e.clientX - 8,
        y: e.clientY - 8
      };
    };

    document.onmouseenter = () => this.cursor!.classList.remove("hidden");
    document.onmouseleave = e => this.cursor!.classList.add("hidden");
    document.onmousedown = e => this.cursor!.classList.add("active");
    document.onmouseup = e => this.cursor!.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = this.getDistance(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = this.getDistance(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    // 不断渲染旧位置
    requestAnimationFrame(() => this.render());   // 保证丝滑
  }

  // 用来描述前一个位置和后一个位置的关系
  getDistance(prev: number, curr: number, n: number): number {
    return (1 - n) * prev + n * curr;
  }
}



export default function () {
  new Cursor();
}