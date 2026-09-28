// ===============================
// BUSCADOR DE PLATOS
// ===============================

function buscarPlato() {

    let texto = document.getElementById("buscador").value.toLowerCase();

    let platos = document.querySelectorAll(".plato");

    platos.forEach(function(plato) {

        let nombre = plato.getAttribute("data-nombre");

        if (nombre.includes(texto)) {
            plato.style.display = "block";
        } else {
            plato.style.display = "none";
        }

    });
}


// ===============================
// AGREGAR A FAVORITOS
// ===============================

function agregarFavorito(nombre) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.includes(nombre)) {

        favoritos.push(nombre);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        mostrarFavoritos();
        mostrarAviso(nombre + " guardado en tus favoritos");

    } else {

        mostrarAviso(nombre + " ya está en tus favoritos");

    }
}


// ===============================
// MOSTRAR FAVORITOS
// ===============================

function mostrarFavoritos() {

    let lista = document.getElementById("listaFavoritos");

    if (!lista) {
        return;
    }

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    lista.innerHTML = "";
    actualizarContador(favoritos.length);

    if (favoritos.length === 0) {

        lista.innerHTML =
            "<p>Aún no tienes platos favoritos.</p>";

        return;
    }

    favoritos.forEach(function(nombre, indice) {

        let elemento = document.createElement("div");

        elemento.className = "favorito-item";

        elemento.innerHTML = `
            <strong>❤️ ${nombre}</strong>

            <button onclick="eliminarFavorito(${indice})">
                Eliminar
            </button>
        `;

        lista.appendChild(elemento);

    });
}


// ===============================
// ELIMINAR FAVORITO
// ===============================

function eliminarFavorito(indice) {

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.splice(indice, 1);

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    mostrarFavoritos();
}

function actualizarContador(cantidad) {
    const contador = document.getElementById("contadorFavoritos");
    if (contador) contador.textContent = cantidad;
}

function mostrarAviso(mensaje) {
    let aviso = document.getElementById("aviso");
    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "aviso";
        document.body.appendChild(aviso);
    }
    aviso.textContent = mensaje;
    aviso.classList.add("visible");
    window.clearTimeout(aviso.timer);
    aviso.timer = window.setTimeout(function() {
        aviso.classList.remove("visible");
    }, 2400);
}


// ===============================
// CARGAR FAVORITOS
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarFavoritos();

    }
);
