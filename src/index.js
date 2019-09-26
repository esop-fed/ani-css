import config from './config.js';
import { createCards } from '/ani-css/components/card-list.js';
import markdown from '/ani-css/components/markdown.js';
import { loadScript } from '/ani-css/utils/index.js';
import createBlob from './components/blob.js';

const { project } = config;
const app = document.getElementById('app');

app.append(createCards(project));

loadPolyfill()
    .then(() => {
        markdown('/ani-css/README.md', true).then(node => {
            app.append(node);
        });
    })
    .catch(err => console.error(err));

async function loadPolyfill() {
    if (!window.fetch) {
        await loadScript('https://cdn.bootcss.com/fetch/3.0.0/fetch.min.js');
    }
}

createBlob();
