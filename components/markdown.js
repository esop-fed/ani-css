import 'https://cdn.bootcss.com/marked/0.7.0/marked.min.js';
import { readBlob, loadScript, loadCss } from '../utils/index.js';

// loadCss(
//     'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css'
// );

loadCss(
    'https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-dark.min.css'
);

const loadDep = ((marked, hljs) => async () => {
    try {
        if (!marked) {
            marked = await loadScript(
                'https://cdn.bootcss.com/marked/0.7.0/marked.min.js',
                'marked'
            );

            hljs = await loadScript(
                'https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js',
                'hljs'
            );

            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: code => hljs.highlightAuto(code).value,
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            });
        }

        return { marked };
    } catch (error) {
        throw error;
    }
})();

/**
 * markdown文档转换器
 * @param {string | htmlTemplateString} md markdown string 或者markdown文档地址
 * @param {boolean} remote 是否是markdown文件
 */
export default async function markdown(md, remote = false) {
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

        const pres = container.querySelectorAll('pre');

        pres.forEach(pre => {
            pre.classList.add('hljs');
        });

        return container;
    } catch (error) {
        throw error;
    }
}
