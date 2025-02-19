var CACHE_NAME = 'churros';
var cacheFiles = [
                './',
                './index.html',
                './manifest.json',
                './contactanos.html',
                './chef.html',
                './menu.html',
                './nosotros.html',
                './chef.css',
                './nosotros.css',
                './menu.css',
                './index.css',
                './contacto.css',
                './script.js',
                './images/chef.jpg',
                './images/churros1.png',
                './images/churros2.png',
                './images/churros3.png',
                './images/churros4.png',
                './images/churros5.png',
                './images/churros6.png',
                './images/churros7.png',
                './images/churros8.png',
                './images/churros9.png',
                './images/churros10.png',
                './images/churros11.png',
                './images/churros12.png',
                './images/churros13.png',
                './images/churros14.png',
                './images/churros15.png',
                './images/churros16.png',
                './images/churros17.png',
                './images/churros18.png',
                './images/error.png'
];

self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalando...');
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(async function(cache) {
                console.log('Service Worker ya instale cache', CACHE_NAME);
                return Promise.all(
                    cacheFiles.map(async (file) => {
                        try {
                            const response = await fetch(file);
                            if (!response.ok) throw new Error('Error ${response.status} en ${file}');
                            await cache.put(file, response);
                            console.log('Cacheado: ${file}');
                        } catch (error) {
                            console.error('No se pudo cachear: ${file}', error);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Workers archivos procesados');
                self.skipWaiting();
            })
            .catch(err => {
                console.error('Error al abrir la caché', err);
            })
    );
});

self.addEventListener('activate', function(e) {
    console.log('Service Worker en accion');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== CACHE_NAME) {
                        console.log('sustituyendo cache', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('Service Worker localizando', e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('encontre tu cache', e.request.url);
                return response;
            }
            return fetch(e.request).then(function(networkResponse) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(function(err) {
                console.log('Error al hacer fetch', err);
            });
        })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification("LOs churros de Don ramon te esperan", {
            body: "mientras vas por la calle comete un churro de don ramon",
            icon: "./images/192x192.png"
        });
    }
});