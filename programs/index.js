import config from './config.js';
import { createCards } from '../components/card-list.js';

const { programs } = config;
const app = document.querySelector('.programs-container');
const fragment = Object.entries(programs).reduce((html, [key, value]) => {
    const div = document.createElement('div');

    div.className = 'program';
    div.innerHTML = createCards(value.list);

    html.appendChild(div);

    return html;
}, document.createDocumentFragment());

app.appendChild(fragment);
