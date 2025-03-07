// script.js

import { db, collection, addDoc, getDocs } from "./firebase.js";

// API Key de OpenWeather (ejemplo gratuita, debes usar la tuya en producción)
const weatherApiKey = "b6907d289e10d714a6e88b30761fae22";  // Ejemplo (puedes cambiarla)
const ciudad = "Chitré,PA";

// Función para obtener clima actual
async function cargarClima() {
    const climaInfo = document.getElementById("clima-info");
    try {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${weatherApiKey}`);
        const datos = await respuesta.json();
        climaInfo.innerHTML = `${datos.weather[0].description}, ${datos.main.temp}°C`;
    } catch (error) {
        climaInfo.innerHTML = "No se pudo obtener el clima.";
    }
}

// Guardar anuncio
async function guardarAnuncio(titulo, descripcion, contacto) {
    try {
        await addDoc(collection(db, "anuncios"), {
            titulo, descripcion, contacto,
            fecha: new Date().toLocaleString()
        });
        alert("Anuncio guardado correctamente!");
        cargarAnuncios();
    } catch (e) {
        console.error("Error al guardar anuncio:", e);
        alert("Error al guardar el anuncio.");
    }
}

// Cargar anuncios y elegir uno como destacado
async function cargarAnuncios() {
    const contenedor = document.getElementById("lista-anuncios");
    const anuncioDia = document.getElementById("anuncio-dia");

    contenedor.innerHTML = "<p>Cargando anuncios...</p>";
    try {
        const snapshot = await getDocs(collection(db, "anuncios"));
        const anuncios = [];

        snapshot.forEach(doc => anuncios.push(doc.data()));

        contenedor.innerHTML = "";
        anuncios.forEach(anuncio => {
            const div = document.createElement("div");
            div.className = "anuncio";
            div.innerHTML = `<h3>${anuncio.titulo}</h3><p>${anuncio.descripcion}</p><small>📞 ${anuncio.contacto}</small><br><small>${anuncio.fecha}</small>`;
            contenedor.appendChild(div);
        });

        if (anuncios.length > 0) {
            const destacado = anuncios[Math.floor(Math.random() * anuncios.length)];
            anuncioDia.innerHTML = `<strong>${destacado.titulo}</strong><br>${destacado.descripcion}<br><small>Contacto: ${destacado.contacto}</small>`;
        } else {
            anuncioDia.innerHTML = "Aún no hay anuncios destacados.";
        }
    } catch (e) {
        console.error("Error al cargar anuncios:", e);
        contenedor.innerHTML = "<p>Error al cargar anuncios.</p>";
        anuncioDia.innerHTML = "Error al cargar anuncio destacado.";
    }
}

// Evento de formulario
document.getElementById("form-anuncio").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const contacto = document.getElementById("contacto").value;
    guardarAnuncio(titulo, descripcion, contacto);
    e.target.reset();
});

// Cargar todo al inicio
window.onload = () => {
    cargarClima();
    cargarAnuncios();
};