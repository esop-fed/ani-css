// javascript
import markdown from '../../../components/markdown.js';

((g, d) => {
    const flower = d.querySelector('.flower');
    const butterfly = d.querySelector('.butterfly');
    const button = d.querySelector('button');
    let count = 0;

    button.addEventListener('click', () => {
        flower.classList.toggle('hide');
        butterfly.classList.toggle('hide');
        if (count % 2 === 0) {
            button.innerText = '我要看蝴蝶';
        } else {
            button.innerText = '我要看花花';
        }

        count++;
    });

    const readme = document.querySelector('.readme');

    markdown('/ani-css/programs/example/wlxm/readme.md', true).then(node => {
        readme.append(node);
    });
})(window, document);
