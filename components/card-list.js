export function createCards(list) {
    return list.reduce((html, item, index) => {
        html += `
            <a class="card" href="${item.path}">
                <h3 class="title">${item.title}</h3>
                <p>${item.description}</p>
            </a>
        `;
    
        return html;
    }, ``);
}
