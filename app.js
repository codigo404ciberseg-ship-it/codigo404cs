/* =====================================================
   Código 404 PWA
   app.js
=====================================================*/

//-------------------------------------
// BOTÓN IR ARRIBA
//-------------------------------------

const backToTop = document.getElementById("btn-back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

window.topFunction = function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

//-------------------------------------
// REGISTRO SERVICE WORKER
//-------------------------------------

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("sw.js")
            .then(() => {

                console.log("✅ Service Worker registrado");

            })
            .catch(err => {

                console.error(err);

            });

    });

}

//-------------------------------------
// INSTALACIÓN PWA
//-------------------------------------

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", e => {

    e.preventDefault();

    deferredPrompt = e;

    if (installBtn) {

        installBtn.style.display = "inline-block";

    }

});

if (installBtn) {

    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        console.log("Resultado:", outcome);

        deferredPrompt = null;

        installBtn.style.display = "none";

    });

}