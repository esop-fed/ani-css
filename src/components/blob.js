export default function createBlob() {
    const blob = document.querySelector('.blob');
    const lEye = blob.querySelector('.left-eye');
    const rEye = blob.querySelector('.right-eye');
    const lEyeInfo = getElLocation(lEye);
    const rEyeInfo = getElLocation(rEye);
    const baseSize = 10;

    window.addEventListener('mousemove', e => {
        setEyeLocation({
            eye: lEye,
            info: lEyeInfo,
            mouseInfo: e,
            size: baseSize,
            attrs: {
                x: '--lx',
                y: '--ly'
            }
        });

        setEyeLocation({
            eye: rEye,
            info: rEyeInfo,
            mouseInfo: e,
            size: baseSize,
            attrs: {
                x: '--rx',
                y: '--ry'
            }
        });
    });
}

function setEyeLocation({
    eye,
    info,
    mouseInfo = { x: 0, y: 0 },
    size = 10,
    attrs = { x: '', y: '' }
}) {
    const b = mouseInfo.clientX - info.x;
    const h = mouseInfo.clientY - info.y;
    const sum = Math.abs(b) + Math.abs(h);
    const x = (b / sum) * size;
    const y = (h / sum) * size;

    eye.style.setProperty(attrs.x, x + 'px');
    eye.style.setProperty(attrs.y, y + 'px');
}

function getElLocation(el) {
    const rect = el.getBoundingClientRect();

    return {
        x: rect.left,
        y: rect.top
    };
}
