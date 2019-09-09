import 'https://cdn.bootcss.com/marked/0.7.0/marked.min.js';
import { readBlob, loadScript } from '../utils/index.js';

const githubCSS = document.createElement('link');

githubCSS.rel = 'stylesheet';
githubCSS.href = 'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css';
document.head.appendChild(githubCSS);

const loadDep = ((marked, hljs) => async () => {
    try {
        if (!marked || !hljs) {
            marked = await loadScript('https://cdn.bootcss.com/marked/0.7.0/marked.min.js', 'marked');
            hljs = await loadScript('https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js', 'hljs');

            // marked.setOptions({
            //     renderer: new marked.Renderer(),
            //     highlight: function(code) {
            //         return hljs.highlightAuto(code).value;
            //     },
            //     pedantic: false,
            //     gfm: true,
            //     tables: true,
            //     breaks: false,
            //     sanitize: false,
            //     smartLists: true,
            //     smartypants: false,
            //     xhtml: false
            // });
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
