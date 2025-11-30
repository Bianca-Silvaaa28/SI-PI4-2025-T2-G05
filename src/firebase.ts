// Importações necessárias do SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Configurações do firebase 
const firebaseConfig = {
  apiKey: "AIzaSyB7zqXD7b4eENVG8sOfrvc07mYPwG84JJw",
  authDomain: "formulario-dc19e.firebaseapp.com",
  projectId: "formulario-dc19e",
  storageBucket: "formulario-dc19e.firebasestorage.app",
  messagingSenderId: "253672605470",
  appId: "1:253672605470:web:9c16c1f7f679a6d214eb0f",
  measurementId: "G-K0Q825KESY"
};

// Inicialização do firebase
const app = initializeApp(firebaseConfig);

// Instância de autenticação - Exporta serviços que serão usados
export const auth = getAuth(app);
export const db = getFirestore(app);
