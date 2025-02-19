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
                './ws.js',
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
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil()(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                   if(thisCacheName !== CACHE_NAME) {
                    console.log('Cache reemplazada', thisCacheName);
                    return caches.delete(thisCacheName);
                   }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: buscando', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro el archivo');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification("LOs churros de Don ramon te esperan", {
            body: "mientras vas por la calle comete un churro de don ramon",
            icon: "./images/192x192.png"
        });
    }
});