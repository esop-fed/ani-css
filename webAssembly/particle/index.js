class Particle {
    // 重力加速度
    acceleration = 0.25;
    // 弹性碰撞 速率衰减
    elasticCollision = 0.99;

    constructor({
        edge = { x: 0, y: 0 },
        speed = { x: 1, y: 1 },
        color = '#e98484',
        r = 4,
    }) {
        const { random } = Math;
        const [rx, ry, rz] = [random(), random(), random()];

        this.x = rx * edge.x;
        this.y = ry * edge.y;
        this.vx = rz > 0.5 ? rx * speed.x : -rx * speed.x;
        this.vy = rz > 0.5 ? ry * speed.y : -ry * speed.y;
        this.color = color;
        this.r = r;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
         /**
         * arc(x, y, radius, startAngle, endAngle, anticlockwise)
         */
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    move(edge) {
        this.x += this.vx;
        this.y += this.vy;

        // this.vy *= this.elasticCollision
        // this.vy += this.acceleration

        this.vx = this.x < edge.x && this.x > 0 ? this.vx : -this.vx;
        this.vy = this.y < edge.y && this.y > 0 ? this.vy : -this.vy;
    }
}

const app = document.getElementById('app');

function initial(app) {
    const canvas = document.createElement('canvas');
    const edge = {
        x: app.offsetWidth,
        y: app.offsetHeight
    };

    canvas.width = edge.x;
    canvas.height = edge.y;
    app.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const draw = initialDraw(ctx, edge, canvas);

    draw();
}

initial(app);

function initialDraw(ctx, edge, canvas) {
    const particles = [];
    const total = 100;
    const mouseParticle = new Particle({ edge, color: '#f0f', r: 2, speed: { x: 0, y: 0} });

    for (let i = 0; i < total - 1; i++) {
        particles.push(new Particle({ edge }));
    }

    particles.push(mouseParticle);

    canvas.addEventListener('mousemove', e => {
        const { clientX: x, clientY: y } = e;

        mouseParticle.x = x;
        mouseParticle.y = y;
    })

    return function draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(0, 0, edge.x, edge.y);
        // ctx.clearRect(0, 0, edge.x, edge.y);
        
        for (let i = 0; i < total; i++) {
            particles[i].draw(ctx);
            particles[i].move(edge);
        }

        drawLine(ctx, particles);

        requestAnimationFrame(draw);
    };
}

function drawLine(ctx, particles = []) {
    const len = particles.length;

    for (let i = 0; i < len; i++) {
        p = particles[i];

        for (let j = i + 1; j < len; j++) {
            line(ctx, p, particles[j]);
        }
    }
}

function line(ctx, p, q, color = '#d9d9d9', maxDistance = 60) {
    const d = Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));

    if (d <= maxDistance) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
    }
}
