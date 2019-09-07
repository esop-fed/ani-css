import 'https://cdn.bootcss.com/marked/0.7.0/marked.min.js';

const marked = window.marked;

export default async function transformMd(md, remote = false) {
    if (!marked) {
        throw new Error('https://cdn.bootcss.com/marked/0.7.0/marked.min.js 加载失败！');
    }

    if (!remote) {
        return marked(md);
    } else {
        try {
            const res = await fetch(md);
            const content = await readBlob(await res.blob());

            return marked(content);
        } catch(err) {
            throw err;
        }
    }
}

export function readBlob(blob) {
    const reader = new FileReader();

    reader.readAsBinaryString(blob);

    return new Promise(resolve => {
        reader.onload = e => {
            resolve(e.target.result);
        }
    })
}
