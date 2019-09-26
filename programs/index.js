import { list } from './config.js';
import Modal from '../components/modal.js';
import markdown from '../components/markdown.js';
import { createCards } from '../components/card-list.js';

const modal = new Modal();

const modalOpener = document.querySelector('.modal-opener');

modalOpener.addEventListener('click', () => {
    modal.open({
        title: '测试Modal和Markdown',
        html: markdown('./book/summary.md', true)
    });
});

// const fragment = list.reduce((_fragment, program) => {
//     const section = document.createElement('section');
//     const cardList = document.createElement('div');

//     section.className = 'program-wrap';
//     cardList.className = 'card-list';
//     section.innerHTML = `<header>${program.description}</header>`;
//     cardList.appendChild(createCards(list));
//     section.appendChild(cardList);
//     _fragment.appendChild(section);

//     return _fragment;
// }, document.createDocumentFragment());

function init() {
    const app = document.querySelector('.container');
    const cardList = document.createElement('div');

    cardList.className = 'card-list';
    cardList.appendChild(createCards(list));
    app.appendChild(cardList);
}

init();
