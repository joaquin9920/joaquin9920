// script.js

import { db, collection, addDoc, getDocs } from "./firebase.js";

// Función para guardar un anuncio en Firestore
async function guardarAnuncio(titulo, descripcion, contacto) {
    try {
        await addDoc(collection(db, "anuncios"), {
            titulo: titulo,
            descripcion: descripcion,
            contacto: contacto,
            fecha: new Date().toLocaleString()
        });
        alert("Anuncio guardado correctamente!");
        cargarAnuncios();  // Refrescamos la lista al guardar
    } catch (e) {
        console.error("Error al guardar el anuncio: ", e);
        alert("Hubo un error al guardar el anuncio.");
    }
}

// Función para cargar y mostrar anuncios desde Firestore
async function cargarAnuncios() {
    const contenedor = document.getElementById("lista-anuncios");
    contenedor.innerHTML = "<p>Cargando anuncios...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "anuncios"));
        contenedor.innerHTML = "";  // Limpiamos al recargar

        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            const div = document.createElement("div");
            div.classList.add("anuncio");
            div.innerHTML = `
                <h3>${anuncio.titulo}</h3>
                <p>${anuncio.descripcion}</p>
                <small>Contacto: ${anuncio.contacto}</small><br>
                <small>Publicado: ${anuncio.fecha}</small>
            `;
            contenedor.appendChild(div);
        });

        if (querySnapshot.empty) {
            contenedor.innerHTML = "<p>No hay anuncios por ahora.</p>";
        }

    } catch (e) {
        console.error("Error al cargar anuncios: ", e);
        contenedor.innerHTML = "<p>Error al cargar anuncios.</p>";
    }
}

// Manejador para el formulario de nuevo anuncio
document.getElementById("form-anuncio").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const contacto = document.getElementById("contacto").value;

    if (titulo && descripcion && contacto) {
        guardarAnuncio(titulo, descripcion, contacto);
        document.getElementById("form-anuncio").reset();
    } else {
        alert("Por favor completa todos los campos.");
    }
});

// Cargar anuncios al inicio
window.onload = cargarAnuncios;