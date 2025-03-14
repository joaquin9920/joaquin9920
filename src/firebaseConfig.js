import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRpBidqt0vlgXbqqflqKZLnLPRBkA4Mvg",
  authDomain: "azuero-busca.firebaseapp.com",
  projectId: "azuero-busca",
  storageBucket: "azuero-busca.firebasestorage.app",
  messagingSenderId: "98932584649",
  appId: "1:98932584649:web:359d64080ee95372ab5d18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
