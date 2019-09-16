if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('sw.js')
     .then((registration) => {
       console.log("Service Worker registration successful")
      }, (err) => {
       console.log("Registration failed")
      })
     })
   }

   var CACHE_NAME = 'static-cache';
   var urlsToCache = [
     '.', 'index.html', 'index2.html'
   ]

   self.addEventListener('install', 
    function(e){
      e.waitUntil(caches.open(CACHE_NAME)
        .then(function(cache){
          return cache.addAll(urlsToCache)
        })
      );
    });

    self.addEventListener('fetch', 
      function(e){
          console.log("fetch")
        e.respondWith(
          caches.match(e.request)
          .then(response=>{
            return response||fetch(e.request)
          })
        )
      }
    )
