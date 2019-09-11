const colorRandom = () => {
    let r = Math.floor(Math.random() * (255 - 1) + 1),
        g = Math.floor(Math.random() * (255 - 1) + 1),
        b = Math.floor(Math.random() * (255 - 1) + 1);

    return `rgb(${r}, ${g}, ${b})`;
};

const creatPages = (pages, zIndex) => {
    let translateDom = document.createElement('div');

    translateDom.classList = ['container'];
    translateDom.innerHTML = pages.reduce((pre, next) => {
        translateDom.style.zIndex = zIndex;
        pre += `<div class="${
            next.class
        }"; style="background-color: ${colorRandom()}">${next.index}</div>`;
        return pre;
    }, ``);

    return translateDom;
};

const changeZIindex = el => {
    const preDom = el.previousElementSibling || el.previousSibling || false;
    let preZIndex = preDom ? preDom.style.zIndex : 0;
    let presentZIndex = el.style.zIndex;

    if (preDom) {
        el.style.zIndex = preZIndex;
        preDom.style.zIndex = presentZIndex;
    }
};

class Book {
    constructor(config) {
        this.pagination = config.pagination || 3;
        this.book = config.el;
        this.bookName = config.name;
        this.animationBol = false;
        this.animationDom = '';

        this.domInit();
        this.methodsRegister();
    }

    domInit() {
        const fragment = document.createDocumentFragment();
        let pages = [];

        for (let i = 1; i < this.pagination + 1; i++) {
            let isEven = !(i % 2);

            pages.push({
                class: 'page' + ' ' + (isEven ? 'contrary' : 'fronfan'),
                index: i
            });

            if (isEven || i === this.pagination) {
                fragment.appendChild(creatPages(pages, this.pagination - i));
                this.book.appendChild(fragment);
                pages = [];
            }
        }
    }

    methodsRegister() {
        this.book.addEventListener(
            'click',
            e => {
                const page = e.target.parentNode;
                let classList = page.classList;

                if (!classList.contains('container') || this.animationBol) {
                    return;
                }

                this.animationDom = page;
                this.animationBol = true;

                if (classList.contains('toRight')) {
                    page.classList.add('toLeft');
                    page.classList.remove('toRight');
                } else if (classList.contains('toLeft')) {
                    page.classList.add('toRight');
                    page.classList.remove('toLeft');
                } else {
                    page.classList.add('toLeft');
                }
            },
            false
        );

        this.book.addEventListener(
            'webkitAnimationEnd',
            e => {
                changeZIindex(this.animationDom);
                this.animationBol = false;
            },
            false
        );
    }
}

export default Book;
