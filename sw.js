const shellFilesToCache = [
    'images/chuck-berry-lg.jpg',
    'images/chuck-berry-md.jpg',
    'images/chuck-berry-sm.jpg',
    'images/guns-n-roses-lg.jpg',
    'images/guns-n-roses-md.jpg',
    'images/guns-n-roses-sm.jpg',
    'images/led-zeppelin-lg.jpg',
    'images/led-zeppelin-md.jpg',
    'images/led-zeppelin-sm.jpg',
    'images/mitski-lg.jpg',
    'images/mitski-md.jpg',
    'images/mitski-sm.jpg',
    'images/nirvana-lg.jpg',
    'images/nirvana-md.jpg',
    'images/nirvana-sm.jpg',
    'images/the-beatles-lg.jpg',
    'images/the-beatles-md.jpg',
    'images/the-beatles-sm.jpg',
    'images/the-strokes-lg.jpg',
    'images/the-strokes-md.jpg',
    'images/the-strokes-sm.jpg',
    'images/social-media/spotify.png',
    'images/social-media/soundcloud.png',
    'images/social-media/bandcamp.png',
    'images/social-media/youtube.png',
    'index.html',
    'index.css',
    '404.html',
    'offline.html'
];

const cacheName = 'cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('SW: Installing service worker and caching shell assets!');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(shellFilesToCache);
        })
    )
});

self.addEventListener('activate', () => {
    console.log('SW: Activating service worker!');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response){
                console.log(`Found ${event.request.url} in cache`);
                return response;
            }
            console.log(`Element ${event.request.url} not found in cache. Fetching...`);
            return fetch(event.request).then((response => {
                if(response.status === 404 && event.request.headers.get('accept').includes('text/html')){
                    console.log('Asset not found!');
                    console.log(event.request.url);
                    return caches.match('404.html');
                }
                if(event.request.method === 'GET'){
                    return caches.open(cacheName).then(cache => {
                        console.log('Fetched succesfully. Storing in cache...');
                        cache.put(event.request, response.clone());
                        return response;
                    })
                }
                return response;
            })).catch(error => {
                console.error('There was an error while fetching: ', error);
                return caches.match('offline.html');
            });
        }).catch(error => {
            console.error('Caches wont open. Probably offline', error);
            return caches.match('offline.html');
        })
    )

});