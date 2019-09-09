import config from './config.js';
import { createCards } from '../components/card-list.js';
import markdown from '../components/markdown.js';

const { project } = config;
const app = document.getElementById('app');

app.append(createCards(project));

markdown('/ani-css/README.md', true).then(node => {
    app.append(node);
});
