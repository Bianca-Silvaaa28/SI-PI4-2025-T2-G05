// src/api.js ou src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Auth, se precisar

const firebaseConfig = {
  apiKey: "AIzaSyB7zqXD7b4eENVG8sOfrvc07mYPwG84JJw",
  authDomain: "formulario-dc19e.firebaseapp.com",
  projectId: "formulario-dc19e",
  storageBucket: "formulario-dc19e.firebasestorage.app",
  messagingSenderId: "253672605470",
  appId: "1:253672605470:web:9c16c1f7f679a6d214eb0f",
  measurementId: "G-K0Q825KESY",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa serviços que você vai usar
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
