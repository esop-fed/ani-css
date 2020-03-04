self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('v2').then(cache => {
            return cache.addAll([
                '/ani-css/',
                '/ani-css/index.html',
                '/ani-css/style/style.css',
                '/ani-css/style/variables.css',
                '/ani-css/src/index.js',
                '/ani-css/src/config.js',
                '/ani-css/404.jpeg'
            ]);
        })
    );

    console.log('installed');
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches
            .match(evt.request)
            .then(res => {
                if (res !== undefined) {
                    return res;
                } else {
                    return fetch(evt.request).then(res => {
                        let responseClone = res.clone();

                        caches.open('v2').then(cache => {
                            cache.put(evt.request, responseClone);
                        });

                        return res;
                    });
                }
            })
            .catch(err => {
                console.warn(err);

                return caches.match('/ani-css/404.jpeg');
            })
    );
});
