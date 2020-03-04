// register service worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/ani-css/sw.js', { scope: '/ani-css/' })
        .then(function(reg) {
            if (reg.installing) {
                console.log('Service worker installing');
            } else if (reg.waiting) {
                console.log('Service worker installed');
            } else if (reg.active) {
                console.log('Service worker active');
            }
        })
        .catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
}

export default {
    project: [
        {
            title: 'Ani-css',
            description: 'css demos',
            path: '/ani-css/programs'
        }
    ],
    users: ['niannings', 'johninch', 'dannisi', 'Xmtd', 'febcat', 'superwyk']
};
