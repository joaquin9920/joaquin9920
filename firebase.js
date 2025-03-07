
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBRpBidqt0vlgXbqqflqKZLnLPRBkA4Mvg",
    authDomain: "azuero-busca.firebaseapp.com",
    projectId: "azuero-busca",
    storageBucket: "azuero-busca.firebasestorage.app",
    messagingSenderId: "98932584649",
    appId: "1:98932584649:web:359d64080ee95372ab5d18",
    measurementId: "G-850CB11YQ5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, addDoc, getDocs };
