// firebase.js

// Importamos las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (la que me pasaste)
const firebaseConfig = {
    apiKey: "AIzaSyBRpBidqt0vlgXbqqflqKZLnLPRBkA4Mvg",
    authDomain: "azuero-busca.firebaseapp.com",
    projectId: "azuero-busca",
    storageBucket: "azuero-busca.firebasestorage.app",
    messagingSenderId: "98932584649",
    appId: "1:98932584649:web:359d64080ee95372ab5d18",
    measurementId: "G-850CB11YQ5"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Conectamos con Firestore (base de datos)
const db = getFirestore(app);

// Exportamos para poder usarlos en el script principal
export { db, collection, addDoc, getDocs };