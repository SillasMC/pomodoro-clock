let cacheName			= "localWeatherPWA-v3";
let appShellCache		= [
	"/",
	"/index.html",
	"/js/script.js",
	"/js/register.js",
	"/js/permissions.js",
	"/css/styles.css"
];

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Installing SW...');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell...');
			return cache.addAll(appShellCache);
		})
	);
});

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activating SW...');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch: ', e.request.url);
	// Cache, falling back to the network
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});
