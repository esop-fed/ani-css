const FPS = 1000 / 60;
const g = (9.8 * FPS) / 1000 / 1000;

interface IVector2D {
  x: number;
  y: number;
  getAngel: () => number;
}

export class Vector2D implements IVector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getAngel() {
    return Math.atan(this.y / this.x)
  }
}

interface IBallOptions {
  radius?: number;
  color?: string;
  globalAlpha?: number;
  velocity?: Vector2D;
  position?: Vector2D;
  ctx: CanvasRenderingContext2D | null;
}

interface IBall extends IBallOptions {
  draw: () => void;
}

export class Ball implements IBall {
  radius: number = 8;
  color: string = '#f00';
  globalAlpha: number = 1;
  velocity: Vector2D = new Vector2D(0, 100 / FPS);
  position: Vector2D = new Vector2D(this.radius, this.radius);
  ctx: CanvasRenderingContext2D | null;

  constructor(options: IBallOptions) {
    this.ctx = options.ctx;

    Object.assign(this, options);
  }

  draw() {
    const { ctx, position, radius, color } = this;

    if (ctx) {
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.globalAlpha = this.globalAlpha;
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

interface IClock {
  id?: number;
  time: number;
  start: () => void;
  stop: () => void;
}

class Clock implements IClock {
  id: number | undefined = undefined;
  time = 0;

  start(frequency: number = 1000) {
    this.id = window.setInterval(() => {
      this.time++;
    }, frequency);
  }

  stop() {
    this.time = 0;
    window.clearInterval(this.id);
  }
}

interface IFireworksOptions {
  canvas: HTMLCanvasElement; // 画布
  frequency?: number; // 发射频率
  density?: number; // 爆炸数量
  v0?: number; // 初速度
  a?: number; // 加速度
  auto?: boolean; // 是否自动发射
}

interface IFireworks extends IFireworksOptions {
  clearing?: boolean;
  launch: (options: IBallOptions) => void; // 发射
  blast: (position: Vector2D) => void; // 爆炸
}

interface IFireworksLuanchOptions extends Omit<IBallOptions, 'ctx'> {}

class Fireworkds implements IFireworks {
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement;
  frequency: number = 1000;
  density: number = 10;
  v0: number = 4;
  auto: boolean = false;
  a: number = 2 * FPS / 1000 / 1000;
  clearing = false;

  constructor(options: IFireworksOptions) {
    this.canvas = options.canvas;
    this.ctx = options.canvas.getContext('2d');

    const ratio = window.devicePixelRatio;

    this.ctx.scale(ratio, ratio);

    Object.assign(this, options)
  }

  clear = () => {
    const { ctx, canvas } = this;

    this.clearing = true;

    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
    }
  }

  launch = (options?: IFireworksLuanchOptions) => {
    const { ctx, frequency, auto, v0, a, clear } = this;
    const fireBall = new Ball({ ctx, velocity: new Vector2D(0, v0), radius: 4 * Math.random(), color: color16(), ...options });
    let optionsBak = auto ? JSON.stringify(options) : null;
    let raf: number;
    let time = 0;

    const draw = () => {
      let { velocity } = fireBall;

      if (ctx) {
        clear();
        fireBall.draw();
        fireBall.position.x += velocity.x;
        fireBall.position.y += -velocity.y;
  
        if (velocity.y <= 0) {
          window.cancelAnimationFrame(raf);
          this.blast(fireBall.position);
        } else {
          fireBall.velocity.y -= (g - a) * time;
          time++;
          raf = window.requestAnimationFrame(draw);
        }
      }
    };

    if (auto && optionsBak) {
      const newOptions = JSON.parse(optionsBak);
      const rand = Math.random();

      newOptions.velocity = new Vector2D(rand * v0, v0);

      setTimeout(() => {
        this.launch(newOptions);
      }, frequency);
    }

    draw();
  }

  blast = (position: Vector2D) => {
    const { density, v0, ctx, clear, a } = this;
    const fireBalls = Array(density).fill(null).map((_, index) => {
      const angel = 2 * Math.PI / density * index;

      return new Ball({
        ctx,
        radius: 4 * Math.random(),
        color: color16(),
        velocity: new Vector2D(Math.cos(angel) * v0 * Math.random() * 1.5, Math.sin(angel) * v0),
        position: new Vector2D(position.x, position.y)
      });
    });
    let raf: number;
    let next: (value?: unknown) => void;
    let time = 0;

    new Promise(resolve => {
      next = resolve;
    }).then(() => {
      // launch();
    });

    // clock.start();

    function draw() {
      clear();

      for (let i = 0; i < fireBalls.length; i++) {
        const ball = fireBalls[i];
        let { velocity } = ball;

        ball.draw();
        ball.position.x += velocity.x;
        ball.position.y += -velocity.y;
        velocity.y -= (g - a) * time / 10;
        time++;

        if (velocity.y < -i) {
          fireBalls.splice(i, 1);
        }
      }

      if (fireBalls.length === 0) {
        time = 0;
        window.cancelAnimationFrame(raf);
        next();
      } else {
        raf = window.requestAnimationFrame(draw);
      }
    }

    draw();
  }
}

export default Fireworkds;

function color16() {//十六进制颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    return color;
}
