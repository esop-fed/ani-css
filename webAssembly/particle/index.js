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
    const draw = initialDraw(ctx, edge);

    requestAnimationFrame(draw);
}

initial(app);

function initialDraw(ctx, edge) {
    const drawParticle = initialDrawParticle({ total: 100, edge });

    return function draw() {
        ctx.clearRect(0, 0, edge.x, edge.y);
        const particles = drawParticle(ctx);

        drawLine(ctx, particles);
    };
}

function initialDrawParticle({
    total = 10,
    r = 8,
    color = '#f00',
    edge = { x: 0, y: 0 }
}) {
    const particles = [];
    const { random } = Math;

    for (let i = 0; i < total; i++) {
        particles.push({
            x: random() * edge.x,
            y: random() * edge.y
        });
    }

    return function drawParticle(ctx) {
        const { PI } = Math;

        for (let i = 0; i < total; i++) {
            const pos = particles[i];

            ctx.fillStyle = color;
            ctx.beginPath();
            /**
             * arc(x, y, radius, startAngle, endAngle, anticlockwise)
             */
            ctx.arc(pos.x, pos.y, r, 0, 2 * PI);
            ctx.fill();
        }

        return particles;
    };
}

function drawLine(ctx, particles = []) {
    const len = particles.length;
    const { sqrt } = Math;
    let d = 0;
    let p;
    let q;

    ctx.strokeStyle = '#f0f';

    console.log(1);

    for (let i = 0; i < len; i++) {
        p = particles[i];

        for (let j = i + 1; j < len; j++) {
            q = particles[j];
            d = sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));

            if (d <= 200) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }
        }

        // move(ctx, { pos: { x: p.x, y: p.y } });
    }
}

function move(ctx, { pos = { x: 0, y: 0 }, speed = 1 }) {
    pos.x += speed;
    pos.y += speed;
    ctx.translate(pos.x, pos.y);
}
