const book = document.querySelector('.book');
const data = 'QW,ER,TY,UI,OP,AS,DF,GH,JK,LZ,XC,VB,NM'.split(',');
const len = data.length;

book.innerHTML = data.reduce((html, [a, b]) => {
    html += `
        <div class="page card">
            <div class="page-front">${a}</div>
            <div class="page-back">${b}</div>
        </div>
    `;

    return html;
}, ``);

const pages = book.querySelectorAll('.page');

pages.forEach((node, index) => {
    node.style.zIndex = len - index;
    node.style.top = index + 'px';
    node.style.right = -index + 'px';

    node.addEventListener('click', e => {
        node.classList.toggle('page--active');

        if (node.classList.contains('page--active')) {
            node.style.zIndex = index;
        } else {
            node.style.zIndex = len - index;
        }
    });
});
