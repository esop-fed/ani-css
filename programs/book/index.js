import { initPage } from '/ani-css/utils/page.js';
import createBlob from '/ani-css/src/components/blob.js';

const list = [
    {
        title: 'jianbo',
        path: 'wlxm',
        poster: 'wlxm/poster.jpg',
        description: '可翻动的书'
    },
    {
        title: 'yuchi',
        path: 'johninch',
        poster: 'johninch/poster.jpg',
        description: '可翻动的书'
    },
    {
        title: 'db',
        path: 'db',
        poster: 'db/poster.jpg',
        description: '可翻动的书'
    },
    {
        title: 'kl',
        path: 'Caleb',
        poster: 'Caleb/poster.jpg',
        description: '可翻动的书'
    },
    {
        title: 'mtd',
        path: 'mtd',
        poster: 'mtd/poster.jpg',
        description: '可翻动的书'
    }
];

initPage(list);

createBlob();
