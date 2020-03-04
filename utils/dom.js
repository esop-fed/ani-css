/**
 * 通过html字符串模板创建DOM
 * @param {string} htmlTemplateString html template string： html字符串
 * @returns {DocumentFragment} 返回文档片段
 */
export const createFragmentByTemplateString = htmlTemplateString => {
    const template = document.createElement('template');

    template.innerHTML = htmlTemplateString;

    return template.content;
};

/**
 * 以dom中心为坐标原点，获取当前鼠标坐标相对与坐标原点的角度
 * @param {HTMLElement} dom 要观测的dom节点
 * @param {(angle: number) => void} handler 处理获取的角度
 */
export function getMouseAngle(dom, handler) {
    const origin = [dom.offsetLeft + dom.offsetWidth / 2, dom.offsetTop + dom.offsetHeight / 2];
    const { atan, PI } = Math;
    console.log(origin)
    window.addEventListener('mousemove', e => {
        let { clientX: x, clientY: y } = e;
        x -= origin[0];
        y -= origin[1];
        handler(atan(y / x) * 180 / PI, [x, y]);
    });
}
