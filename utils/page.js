import { createCards } from '/ani-css/components/card-list.js';
import markdown from '/ani-css/components/markdown.js';

export function initPage(list) {
    const app = document.querySelector('.container');
    const readme = app.querySelector('.readme');
    const cardList = app.querySelector('.card-list');

    markdown('summary.md', true).then(node => {
        readme.append(node);
    });

    cardList.appendChild(createCards(list));
}
