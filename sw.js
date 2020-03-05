const CHACH_PREFIX = 'catch_';
const VERSION = 'v1.0';
const CATCH_NAME = CHACH_PREFIX + VERSION;

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CATCH_NAME).then(cache => {
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

self.addEventListener('fetch', event => {
    let req;
    let url;
    /**
     * 浏览器默认对跨域资源发起的是ncors请求，也就是得到的response是opaque的，Service Worker是无法获得该response的status及url信息，
     * 以至于该response是否成功不得而知。如果对跨域资源能够发起cors请求，在跨域服务器允许的情况下，得到部分属性status及url可见的response，
     * 就可以判断出跨域请求是否成功，是否可以进行缓存以备下次使用了。
     */
    // 这里对于跨域请求，需要重新组装request，来发起cors请求，以便得到部分属性status及url可见的response
    url = event.request.url;
    if (/cors=1/.test(url)) {
        req = new Request(url, { mode: 'cors' });
    } else {
        req = event.request.clone();
    }

    event.respondWith(
        caches
            .open(CATCH_NAME)
            .then(cache => {
                return cache.match(url);
            })
            .then(res => {
                if (res) {
                    return res;
                }
                return addToCache(req);
            })
    );
});

/**
 * 将新请求添加到缓存
 * @param {Request} req 请求对象
 */
function addToCache(req) {
    return fetch(req.clone())
        .then(res => {
            const cacheRes = res.clone();
            if (res.status !== '200' || !/^(basic|cors)$/.test(res.type)) {
                return res;
            }
            caches.open(CATCH_NAME).then(cache => {
                cache.put(req.clone(), cacheRes);
            });
            return res;
        })
        .catch(err => {
            console.warn(err);
            return caches.match('/ani-css/404.jpeg');
        });
}
