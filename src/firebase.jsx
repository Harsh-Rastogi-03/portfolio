// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCkkX3552JgCwpB3S2v7Ycw2kgSG1Bmneg",
    authDomain: "portfolio-7f36c.firebaseapp.com",
    projectId: "portfolio-7f36c",
    storageBucket: "portfolio-7f36c.firebasestorage.app",
    messagingSenderId: "38301496157",
    appId: "1:38301496157:web:9c744980e3083094632eb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);