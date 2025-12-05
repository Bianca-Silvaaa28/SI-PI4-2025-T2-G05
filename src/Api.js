// src/api.js ou src/firebase.js
import { initializeApp } from "firebase/app"; // importa a função principal para inicializar o firebase app
import { getAnalytics } from "firebase/analytics"; // importa a função para obter o serviço analytics (se estiver sendo usado)
import { getFirestore } from "firebase/firestore"; // importa a função para obter o serviço firestore (banco de dados)
import { getAuth } from "firebase/auth"; // importa a função para obter o serviço de autenticação (auth)

// objeto de configuração com as chaves e identificadores do seu projeto firebase
const firebaseConfig = {
    apiKey: "AIzaSyB7zqXD7b4eENVG8sOfrvc07mYPwG84JJw", // sua chave de api pública (seguro para o lado do cliente)
    authDomain: "formulario-dc19e.firebaseapp.com", // domínio usado para autenticação
    projectId: "formulario-dc19e", // id do seu projeto firebase
    storageBucket: "formulario-dc19e.firebasestorage.app", // bucket para armazenamento de arquivos
    messagingSenderId: "253672605470", // id usado para serviços de mensagens
    appId: "1:253672605470:web:9c16c1f7f679a6d214eb0f", // id do aplicativo
    measurementId: "G-K0Q825KESY", // id de medição para analytics
};

// inicializa firebase: cria e configura uma instância do firebase app
const app = initializeApp(firebaseConfig);
// inicializa o serviço analytics
const analytics = getAnalytics(app);

// inicializa serviços que você vai usar
// obtém uma referência ao serviço firestore para interagir com o banco de dados
const db = getFirestore(app);
// obtém uma referência ao serviço de autenticação
const auth = getAuth(app);

// exporta as referências dos serviços inicializados para serem usadas em outros componentes
export { app, analytics, db, auth };