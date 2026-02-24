// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7DxanG0Qj0lAtysO46iQv2WvOfxRk4SE",
    authDomain: "js-canario.firebaseapp.com",
    projectId: "js-canario",
    storageBucket: "js-canario.firebasestorage.app",
    messagingSenderId: "1033322872207",
    appId: "1:1033322872207:web:ce7585f09a77f1bff09ffa"
};

// Inicializamos Firebase y la base de datos
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);