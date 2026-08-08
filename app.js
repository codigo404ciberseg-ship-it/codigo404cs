/* =====================================================
   Código 404 PWA
   app.js
=====================================================*/

//-------------------------------------
// BOTÓN IR ARRIBA
//-------------------------------------

const backToTop = document.getElementById("btn-back-to-top");

window.addEventListener("scroll", () => {

   if (!backToTop) return;

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

/*=====================================================
  SISTEMA DE NOTIFICACIONES
=====================================================*/

const toast = document.getElementById("app-toast");

let toastTimer;

function mostrarToast(mensaje, tipo = "info", duracion = 3500) {

    // Evita que un elemento inexistente detenga todo app.js
    if (!toast) {
        console.warn("⚠️ app-toast no encontrado.");
        return;
    }

    clearTimeout(toastTimer);

    toast.className = "";

    toast.classList.add(tipo);
    toast.classList.add("show");

    toast.innerHTML = mensaje;

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, duracion);
}

/*=====================================================
  ESTADO DE RED
=====================================================*/

window.addEventListener("online",()=>{

    mostrarToast("🟢 Conexión restablecida","success");

});

window.addEventListener("offline",()=>{

    mostrarToast("🔴 Sin conexión a Internet","error",5000);

});
if(navigator.onLine){

    mostrarToast("🟢 Aplicación lista","success",2500);

}else{

    mostrarToast("🔴 Estás trabajando sin Internet","warning",5000);

}

/*==================================================
 DETECTOR DE ACTUALIZACIONES
==================================================*/

let refreshing=false;

navigator.serviceWorker.addEventListener("controllerchange",()=>{

    if(refreshing) return;

    refreshing=true;

    window.location.reload();

});

navigator.serviceWorker.ready.then(reg=>{

    reg.addEventListener("updatefound",()=>{

        const worker=reg.installing;

        worker.addEventListener("statechange",()=>{

            if(worker.state==="installed" && navigator.serviceWorker.controller){

                document

                    .getElementById("update-banner")

                    .classList.add("show");

            }

        });

    });

});

document
const updateAppBtn = document.getElementById("updateApp");

if (updateAppBtn) {

   updateAppBtn.addEventListener("click", () => {

      navigator.serviceWorker.getRegistration()

    .then(reg=>{

       if (reg) {
        reg.update();
       }

        window.location.reload();

    });

});

}

/* =====================================================
   CÓDIGO 404 - BOOT SEQUENCE
   Versión segura
===================================================== */

(function () {

    const bootScreen = document.getElementById("boot-screen");

    if (!bootScreen) return;

    const progressBar =
        document.getElementById("boot-progress-bar");

    const bootStatus =
        document.getElementById("boot-status");

    const welcome =
        document.getElementById("boot-welcome");

    let progress = 0;

    /*
     * MECANISMO DE SEGURIDAD
     * El splash nunca podrá quedarse bloqueado.
     */

    const safetyTimer = setTimeout(() => {

        bootScreen.classList.add("boot-hidden");

        setTimeout(() => {

            if (bootScreen) {
                bootScreen.remove();
            }

        }, 700);

    }, 6000);


    /*
     * Animación de progreso
     */

    const progressInterval = setInterval(() => {

        progress += 10;

        if (progress > 100) {
            progress = 100;
        }

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (bootStatus) {
            bootStatus.textContent = progress + "%";
        }

        if (progress >= 100) {

            clearInterval(progressInterval);

            if (welcome) {
                welcome.classList.add("show");
            }

            setTimeout(() => {

                clearTimeout(safetyTimer);

                bootScreen.classList.add("boot-hidden");

                setTimeout(() => {

                    if (bootScreen) {
                        bootScreen.remove();
                    }

                }, 700);

            }, 700);

        }

    }, 150);

})();
