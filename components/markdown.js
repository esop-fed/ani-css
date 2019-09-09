import 'https://cdn.bootcss.com/marked/0.7.0/marked.min.js';
import { readBlob, loadScript, loadCss } from '../utils/index.js';

loadCss('https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css');

const loadDep = (marked => async () => {
    try {
        if (!marked) {
            marked = await loadScript('https://cdn.bootcss.com/marked/0.7.0/marked.min.js', 'marked');
        }

        return { marked }
    } catch (error) {
        throw error;
    }
})();

export default async function transformMd(md, remote = false) {
    try {
        // 加载依赖
        const { marked } = await loadDep();
        let container = document.createElement('div');

        container.className = 'markdown-body';

        if (!remote) {
            container.innerHTML = marked(md);
        } else {
            const res = await fetch(md);
            const content = await readBlob(await res.blob());

            container.innerHTML = marked(content);
        }

        return container;
    } catch (error) {
        throw error;
    }
}
