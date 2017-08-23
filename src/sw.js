// use a cacheName for cache versioning
var cacheName = 'v1:static';

// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                './style.css',
                './main.js',
                './img/ic_menu_white_24px.svg',
                './img/ic_dashboard_black_24px.svg',
                './img/ic_school_black_24px.svg',
                './img/ic_settings_black_24px.svg',
                './img/logo.png',
                './img/party.png',
                './templates/index.hbs',
                './templates/learn.hbs',
                './templates/finish.hbs',
                './templates/settings.hbs'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function(event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    var title = 'Time for training!';
    var body = 'You haven\'t trained your Polish for more than 5 mins!';
    var icon = '/img/144.png';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon
        })
    );
});
