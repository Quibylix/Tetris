export class AnimationInterval {
  lastTime: number | null = null;
  callback: (time: number) => void;
  interval: number;

  constructor(callback: (time: number) => void, interval: number) {
    this.callback = callback;
    this.interval = interval;
  }

  run(time: number) {
    this.lastTime ?? (this.lastTime = time);

    const delta = time - this.lastTime;

    if (delta > this.interval) {
      this.callback(time);
      this.lastTime = time;
    }
  }

  reset() {
    this.lastTime = null;
  }
}
