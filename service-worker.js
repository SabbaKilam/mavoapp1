let cacheName = 'cache-1';
let filesToCache = [
  'index.html?launcher=true;homescreen=1',
  'L.js',
  'manifest.json',
  'mavo.css',
  'MVC.js',
  'prefixfree.js',
  'service-worker.js',
  'start.js',  
  'style.css',
  'https://cdn.glitch.com/1cfe4610-a16f-4890-bae4-875b1ba8b983%2Ffavicon192x192.png?1492048032743'
];
//------------------------------------------------//
self.addEventListener('install', installCache);
self.addEventListener('fetch', chooseCachedOrRemoteUrl);
//self.addEventListener('activate', waitForAllClientsClaims);
//------------------------------------------------//
function waitForAllClientsClaims(activateEventObject){
  activateEventObject.waitUntil( self.clients.claim());
}
function installCache(eventObject){
  eventObject.waitUntil( filesAreCached() );
}
function filesAreCached(){
  self.caches
      .open(cacheName) // A STRING DEFINED ABOVE
      .then(cacheAllFiles) // A FUNCTION DEFINED BELOW
  ;
}
function cacheAllFiles(cache){
  
  if(!('addAll' in cache)){
    self.importScripts('cache-polyfill.js');
  }
  
  /*
  if(!('addAll' in cache)){
    new Promise((yea, nay)=>{
      let okay = self.importScripts('cache-polyfill.js');
      if(okay){
        yea(true);
      }
      else{}
    })
    .then(response =>{
      if(response === true){
        cache.addAll(filesToCache)
        .then(() => {
          console.log("All files are cached: " + cache); 
        });
      }
    });    
  }
  */
  

  
  cache.addAll(filesToCache)
    .then(() => {
      console.log("All files are cached: " + cache); 
    })
  
    /*
    .then(()=>{
      self.skipWaiting();
    })
    */
  ; 
}
function chooseCachedOrRemoteUrl(fetchEventObject){
  console.log(fetchEventObject.request.url);
  fetchEventObject.respondWith(    
      caches.match(fetchEventObject.request)
            .then(function(response){
                return (response || fetch(fetchEventObject.request));
            })      
    )
}