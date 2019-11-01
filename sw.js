var CACHE_NAME = 'cache-v2';
var urlsToCache = [
  '.', 'index.html', 'addRc.js', 'syncLocalRcs.js', 'timeHelper.js', 'localStorageHelpers.js', 'timeline.js', 
]

self.addEventListener('install', 
function(e){
  e.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache){
      return cache.addAll(urlsToCache)
    })
  );
});

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

 self.addEventListener("sync", event => {
   if (event.tag.substring(0, 2)=="rc") {
     console.log("sync", event);
       const info = event.tag.substring(3);
       event.waitUntil(
           fetch(`/rc`, {
             method: 'POST', 
             headers: {
                 'Content-Type': 'application/json',
             },
             body: info, 
           })
               .then(r => r.text())
               .then(x=>JSON.parse(x))
               .then(x=>console.log("Added to database: ", x.time.substring(16, 24), x.coords))
           )
   }
  // if (event.tag=="rctest") { 
  //     event.waitUntil(
  //       fetch(`/rc`, {
  //         method: 'POST', 
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: {info:"bla"}, 
  //       })
  //     )
  //   }
})


self.addEventListener('fetch', 
  function(e){
    e.respondWith(
      caches.match(e.request)
      .then(response=>{
        return response||fetch(e.request)
      })
    )
  }
)