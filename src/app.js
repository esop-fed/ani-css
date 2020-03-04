import config from './config.js';
import { createFragmentByTemplateString, getMouseAngle } from '../utils/dom.js';
import { user } from '../utils/services/github.js';

const template = `
    <div class="main-container">
        <section class="app__entry-group">
            <ul class="level app__menu">
                <li class="app__menu-item"></li>
                <li class="app__menu-item"></li>
                <li class="app__menu-item"></li>
            </ul>
            <a href="${config.project[0].path}" class="level app__entry">Ani CSS</a>
        </section>
        <h1 class="app__title">动&nbsp;画&nbsp;生&nbsp;动&nbsp;世&nbsp;界</h1>
        <small>ESOP FED返璞归真</small>
        <div class="app__user-list">__user_list__</div>
    </div>
`;

export default async function App() {
    // let timer;

    const html = await getUserList().then(htmlList => {
        return htmlList && htmlList.reduce((html, s) => {
            html += s;
            return html;
        }, '');
    });

    const fm = createFragmentByTemplateString( html ? template.replace('__user_list__', html) : template);
    const group = fm.querySelector('.app__entry-group');

    function rotate(a, [x, y]) {
        group.style.setProperty('--light-angle', a + 'deg');
        group.style.setProperty('--shadow-offset-x', x / 100 + 'px');
        group.style.setProperty('--shadow-offset-y', y / 100 + 'px');
    }

    return {
        component: fm,
        onload: () => {
            // timer = clock(rotate);
            // timer.run();
            getMouseAngle(group, rotate);
        }
    }
}

function getUserList() {
    return Promise.all(config.users.map(u => user.get(u))).then(res => {
        return res.map(item => {
            const { login, avatar_url, url, html_url } = item;

            return `
                <a class="user" href="${html_url}">
                    <img src="${avatar_url}" width="40" alt="${login}"/>
                </a>
            `
        })
    }).catch(alert)
}

// function clock(handler) {
//     const chunk = 360 / 3600000;
//     const { sign, cos } = Math;
//     let id;

//     function run() {
//         const angle = chunk * Date.now() % 3600000;

//         handler(angle + 90, [-cos(angle) > 0 ? 1 < 0 : -1, -sign(angle) > 0 ? 1 : -1]);

//         id = requestAnimationFrame(run);
//     }

//     return { run, id }
// }
