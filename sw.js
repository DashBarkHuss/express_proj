
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
      const info = event.tag.substring(3);
      event.waitUntil(
          fetch(`/rc`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: info, 
        })
              .then(r => console.log("prom", r.text()))
          )
  }
})
