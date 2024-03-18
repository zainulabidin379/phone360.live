'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"apple-touch-icon.png": "35b29db0f48569130e69d421dc5cf2f3",
"assets/AssetManifest.bin": "09083124c68221fe80e8258dfae27bb6",
"assets/AssetManifest.bin.json": "4cb597045e6e44d3d24357b25af7ef60",
"assets/AssetManifest.json": "fe008206c226fe025c2264576fa023c7",
"assets/assets/fonts/Urbanist-Bold.ttf": "1ffe51e22e7841c65481a727515e2198",
"assets/assets/fonts/Urbanist-Light.ttf": "46ffc15bcd0fb7da54fc241cb43ece28",
"assets/assets/fonts/Urbanist-Medium.ttf": "9ffbd4b23b829ddd499aaf5eb925a86c",
"assets/assets/fonts/Urbanist-Regular.ttf": "4c1ae1074c39cca3b3fd7a788b5afd96",
"assets/assets/fonts/Urbanist-SemiBold.ttf": "ae731014b8aa4267df78b8e854d006ef",
"assets/assets/images/agent.png": "3dd0e42008e478457101716c8b67ab28",
"assets/assets/images/brands.png": "f2e9ff7c68b3b28c681037e3065a3429",
"assets/assets/images/fast.png": "57173d806ec789dc0842dd28720e044c",
"assets/assets/images/form.png": "153b743f6b758ef0433762a939fe6d09",
"assets/assets/images/icon.png": "d278c96ba7f2132d144e0ee96e8039cc",
"assets/assets/images/ipad.png": "99ad5a8017b4b78e7273119f449fce09",
"assets/assets/images/iphone.png": "7ecd9441af849a27ef4ba906925b798a",
"assets/assets/images/landing_background.jpg": "cfda22232a2ddc75351c83211791476c",
"assets/assets/images/logo.png": "e6124ed1829698e5a3678954e5b8b536",
"assets/assets/images/mail.png": "bead89aeb9bc5aebdc97232ad34d62b4",
"assets/assets/images/pay.png": "53f4acca660101df393cabc2ba03b374",
"assets/assets/images/premium.png": "3f47a0c95d3f196c495c6a807091e584",
"assets/assets/images/professional.png": "073ff03cc35397ea22f0e0b5856f7c30",
"assets/assets/images/protect.png": "f56146697a61c9f7841074cd4d992d36",
"assets/assets/images/repaired-phone.png": "18b818e6a85d353f25478da6f71b03d0",
"assets/assets/images/rider.png": "1c24bbabfe9a337178a5b6cfe2a796b2",
"assets/assets/images/samsung.png": "99a64c960f1f1c49a86ed4ba2a6eae77",
"assets/assets/images/slider-bg.png": "34564fde975510b00583005c48917894",
"assets/assets/images/toolkit.png": "699e1cbdc11340a3a43b4d9bd2fe696c",
"assets/assets/images/whatsapp.png": "16e414b04832570cbea5901dd06d0d24",
"assets/FontManifest.json": "9a911d3ed9c214c7fdc6a27dcb2f3993",
"assets/fonts/MaterialIcons-Regular.otf": "4f4631a5ce54d3a2efaf5e4635154862",
"assets/NOTICES": "1672da47ad49362bea75d9dccc15437e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "7b2ed1ef909c4787458ff5a47014a258",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/icon-192-maskable.png": "bca33e4705eaed572b617bacb4dde433",
"icons/icon-192.png": "d8a4737221936e0dc4490499cf2f6b19",
"icons/icon-512-maskable.png": "e975131c7f71889ce3330665dc8c1e55",
"icons/icon-512.png": "b531f2b28f51fd3751f2708ba7112fa8",
"index.html": "8bdf275fe04463acb1a287241cb0bdc0",
"/": "8bdf275fe04463acb1a287241cb0bdc0",
"main.dart.js": "7e939c67c8938bfbbc900db00a5dfe8f",
"manifest.json": "9a02c8c6c007b8c0767523330ff4f56d",
"version.json": "776be97182b99b60e32e5d3dab5ac7bc"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
