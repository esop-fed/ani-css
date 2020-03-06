import { createFragmentByTemplateString } from '../utils/dom.js';
import Modal from './modal.js';

const modal = new Modal();

export const createCard = ({ title, path, description, poster }) => {
    const templateString = `
        <a class="card flow-wave" href="${path}">
            <div class="card-bg" style="background-image: url(${poster})"></div>
            <h3 class="card__title">${title}</h3>
            <p class="card__description">${description}</p>
        </a>
    `;

    const fm = createFragmentByTemplateString(templateString);

    // if (/https?:/.test(path)) {
    const a = fm.querySelector('.card');
    a.href = 'javascript:;';
    a.addEventListener('click', () => {
        const newWin = document.createElement('iframe');
        newWin.src = path;
        newWin.classList.add('outlink-window');
        modal.open({
            title,
            html: newWin,
            style: {
                wrap: 'padding: 0;'
            },
            showHeader: false
        });
    });
    // }

    return fm;
};

export const createCards = list => {
    const fragmanet = document.createDocumentFragment();
    const fragmanetList = [];

    for (let i = 0, len = list.length; i < len; i++) {
        fragmanetList[i] = createCard(list[i]);
    }

    fragmanet.append(...fragmanetList);

    return fragmanet;
};
