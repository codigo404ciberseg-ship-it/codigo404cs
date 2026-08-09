const CACHE_NAME = "codigo404-cache-v1.0.1";

/* ===========
   ARCHIVOS BASE
=========== */

const APP_ASSETS = [

    "/",
    "/index.html",

    "/manifest.json",
    "/app.js",

    "/favicon.png",

    "/icon-192.png",
    "/icon-512.png",

    "/Logo Digital CD-404.jpg",

    "/tips.html",
    "/clientes.html",
    "/certificaciones.html",
    "/explorarsoluciones.html",

    "/analisisforensedigital.html",
    "/auditoriaderedes.html",
    "/asesoriaISO27001.html",
    "/consultoriaSOC.html",
    "/normativaCSIRT.html",
    "/pentesting.html",
    "/capacitacionesgratis.html",

    "/offline.html"

];


/* ===========
   INSTALACIÓN
=========== */

self.addEventListener("install",(event)=>{

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache=>cache.addAll(APP_ASSETS))

    );

    self.skipWaiting();

});


/* ===========
   ACTIVACIÓN
=========== */

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        caches.keys()

        .then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


/* ===========
FETCH
=========== */

self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // No interceptar el contador de visitas
    if (url.hostname === "calm-leaf-b032codigo404ciberseg.workers.dev") {
        return;
    }

    event.respondWith(

        fetch(event.request)

        .then(response => {

            const clone = response.clone();

            caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, clone));

            return response;

        })

        .catch(() => {

            return caches.match(event.request)
                .then(response => {

                    return response ||
                           caches.match("/offline.html");

                });

        })

    );

});
