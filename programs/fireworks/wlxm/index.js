const FPS = 1000 / 60;
const g = (9.8 * FPS) / 1000 / 1000;
export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getAngel() {
        return Math.atan(this.y / this.x);
    }
}
export class Ball {
    constructor(options) {
        this.radius = 8;
        this.color = '#f00';
        this.globalAlpha = 1;
        this.velocity = new Vector2D(0, 100 / FPS);
        this.position = new Vector2D(this.radius, this.radius);
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
class Clock {
    constructor() {
        this.id = undefined;
        this.time = 0;
    }
    start(frequency = 1000) {
        this.id = window.setInterval(() => {
            this.time++;
        }, frequency);
    }
    stop() {
        this.time = 0;
        window.clearInterval(this.id);
    }
}
class Fireworkds {
    constructor(options) {
        this.frequency = 1000;
        this.density = 10;
        this.v0 = 4;
        this.auto = false;
        this.a = (2 * FPS) / 1000 / 1000;
        this.clearing = false;
        this.clear = () => {
            const { ctx, canvas } = this;
            this.clearing = true;
            if (ctx) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = 'rgba(0,0,0,0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'lighter';
            }
        };
        this.launch = options => {
            const { ctx, frequency, auto, v0, a, clear } = this;
            const fireBall = new Ball(
                Object.assign(
                    {
                        ctx,
                        velocity: new Vector2D(0, v0),
                        radius: 4 * Math.random(),
                        color: color16()
                    },
                    options
                )
            );
            let optionsBak = auto ? JSON.stringify(options) : null;
            let raf;
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
        };
        this.blast = position => {
            const { density, v0, ctx, clear, a } = this;
            const fireBalls = Array(density)
                .fill(null)
                .map((_, index) => {
                    const angel = ((2 * Math.PI) / density) * index;
                    return new Ball({
                        ctx,
                        radius: 4 * Math.random(),
                        color: color16(),
                        velocity: new Vector2D(
                            Math.cos(angel) * v0 * Math.random() * 1.5,
                            Math.sin(angel) * v0
                        ),
                        position: new Vector2D(position.x, position.y)
                    });
                });
            let raf;
            let next;
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
                    velocity.y -= ((g - a) * time) / 10;
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
        };
        this.canvas = options.canvas;
        this.ctx = options.canvas.getContext('2d');
        const ratio = window.devicePixelRatio;
        this.ctx.scale(ratio, ratio);
        Object.assign(this, options);
    }
}
export default Fireworkds;
function color16() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}
