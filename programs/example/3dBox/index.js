// javascript
/**
 * 两点直线的斜率
 */
const slope = (start, end) => (end.y - start.y) / (end.x - start.x);

function rotateEl(el) {
    let flag = false;
    let { PI, abs, sqrt } = Math;

    let start = {
        x: 0,
        y: 0
    };

    let end = {
        x: 0,
        y: 0
    };

    el.addEventListener('mousedown', e => {
        flag = true;
        el.classList.remove('auto');
        start.x = e.clientX;
        start.y = e.clientY;
    });

    window.addEventListener('mouseup', e => {
        flag = false;
        el.classList.add('auto');
    });

    el.addEventListener('mousemove', e => {
        if (!flag) return;

        end.x = e.clientX;
        end.y = e.clientY;

        let xd = end.x - start.x;
        let yd = end.y - start.y;
        let k = -1 / slope(start, end); // 转轴斜率
        let symbol = (xd * yd) / abs(xd * yd); // 确定正负
        let d = sqrt(xd * xd + yd * yd); // 鼠标开始到结束两点间距

        // el.style.setProperty('--x', 1);
        el.style.setProperty('--y', k);
        // el.style.setProperty('--sx', '10px');
        // el.style.setProperty("--sy", 10 * k + "px");
        el.style.setProperty('--r', d * symbol + 'deg');
    });
}

const rotate3D = document.querySelector('.rotate3D');

rotateEl(rotate3D);

const light = document.querySelector('.light-btn');
const body = document.body || document.documentElement;

light.addEventListener('click', e => {
    body.classList.toggle('open-light');

    if (body.classList.contains('open-light')) {
        light.textContent = '关灯';
    } else {
        light.textContent = '开灯';
    }
});
