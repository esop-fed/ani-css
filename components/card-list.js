import { createFragmentByTemplateString } from '../utils/dom.js';

export const createCard = ({ title, path, description }) => {
    const templateString = `
        <a class="card flow-wave" href="${path}">
            <h3 class="card__title">${title}</h3>
            <p class="card__description">${description}</p>
        </a>
    `;

    return createFragmentByTemplateString(templateString);
}

export const createCards = list => {
    const fragmanet = document.createDocumentFragment();
    const fragmanetList = [];

    for (let i = 0, len = list.length; i < len; i++) {
        fragmanetList[i] = createCard(list[i]);
    }

    fragmanet.append(...fragmanetList);

    return fragmanet;
}
