import config from './config.js';
import { createCards } from '../components/card-list.js';
import Modal from '../components/modal.js';
import markdown from '../components/markdown.js';

const modal = new Modal();

const { programs } = config;
const app = document.querySelector('.container');
const fragment = Object.entries(programs).reduce(
    (_fragment, [key, { list, description }]) => {
        const section = document.createElement('section');

        section.className = 'program-wrap';
        section.innerHTML = `
        <header>${description}</header>
    `;
        section.appendChild(createCards(list));
        _fragment.appendChild(section);

        return _fragment;
    },
    document.createDocumentFragment()
);

app.appendChild(fragment);

const modalOpener = document.querySelector('.modal-opener');

modalOpener.addEventListener('click', () => {
    modal.open({
        title: '测试Modal和Markdown',
        html: markdown('../README.md', true)
    });
});
