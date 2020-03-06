import { getType } from '../utils/index.js';

// export class Loading {
//     constructor(wrap) {
//         this.wrap = wrap;
//     }

//     open() {
//         const
//     }
// }

export default class Modal {
    /**
     *
     * @param {{
     *      mask: { in: string, out: string },
     *      modal: { in: string, out: string }
     * }} config 过度动画类名
     */
    constructor(
        config = {
            mask: { in: 'fadeIn', out: 'fadeOut' },
            modal: { in: 'bounceInDown', out: 'bounceOutDown' }
        }
    ) {
        if (Modal.instance) {
            Object.assign(Modal.instance, config);

            return Modal.instance;
        }

        this.maskAnimateConfig = config.mask;
        this.modalAnimateConfig = config.modal;

        this.reset();
    }

    reset() {
        if (this.el) {
            this.el.remove();
        }

        this.parent = document.body || document.documentElement;
        this.el = null;
        this.mask = null;
        this.modal = null;
    }

    // html 可以是html字符串模板或者dom节点；appendTo：默认挂在body上，可以自定义；
    async open({
        title = '标题',
        html,
        appendTo = null,
        style = {},
        showHeader
    }) {
        if (!html) {
            console.error(`${html} 内容不正确`);
            return;
        }

        if (appendTo) {
            this.parent = appendTo;
        }

        const wrap = document.createElement('div');
        const { maskAnimateConfig, modalAnimateConfig } = this;

        this.parent.appendChild(wrap);

        wrap.className = 'modal-wrap';
        wrap.innerHTML = `
            <div class="modal-mask animated ${maskAnimateConfig.in}"></div>
            <div class="modal animated ${modalAnimateConfig.in}" style='${
            style.wrap
        }'>
                ${
                    showHeader
                        ? `<header class="modal__header" style='${style.header}'>${title}</header>`
                        : ''
                }
                <article class="modal__content" style='${
                    style.content
                }'></article>
            </div>
        `;

        this.mask = wrap.querySelector('.modal-mask');
        this.modal = wrap.querySelector('.modal');

        const container = wrap.querySelector('.modal__content');

        this.mask.addEventListener('click', () => {
            this.close();
        });

        if (getType(html) === 'promise') {
            container.innerHTML = `
                <div class="loading">
                    <div data-loader='satellite'></div>
                    加载中...
                </div>
            `;

            html = await html;

            container.innerHTML = null;
        }

        if (typeof html === 'string') {
            container.innerHTML = html;
        } else {
            container.appendChild(html);
        }

        this.el = wrap;

        console.log('modal opened (*^_^*)');
    }

    close() {
        if (!this.el) {
            return;
        }

        const { mask, modal, maskAnimateConfig, modalAnimateConfig } = this;
        const animateEls = [mask, modal];
        const len = animateEls.length;
        let flag = 0;

        mask.classList.replace(maskAnimateConfig.in, maskAnimateConfig.out);
        modal.classList.replace(modalAnimateConfig.in, modalAnimateConfig.out);

        animateEls.forEach(el => {
            el.addEventListener('animationend', () => {
                flag++;

                if (flag === len) {
                    this.reset();
                    console.log('modal closed /(ㄒoㄒ)/~~');
                }
            });
        });
    }
}

Modal.instance = new Modal();
