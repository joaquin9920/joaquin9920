// script.js

async function cargarClima() {
    const climaInfo = document.getElementById("clima-info");
    try {
        const respuesta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Chitre,PA&units=metric&lang=es&appid=TU_API_KEY");
        const datos = await respuesta.json();
        climaInfo.innerHTML = `${datos.weather[0].description}, ${datos.main.temp}°C`;
    } catch (error) {
        climaInfo.innerHTML = "No se pudo obtener el clima.";
    }
}

document.getElementById("form-anuncio").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Función de publicación pendiente de integración con Firebase.");
});

window.onload = () => {
    cargarClima();
};