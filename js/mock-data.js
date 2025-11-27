// js/mock-data.js

const COOPERATIVAS_MOCKADAS = [
    {
        id: 1,
        nome: "Coop Central (Óleo e Papel)",
        latitude: -22.9056,
        longitude: -47.0608,
        oleo: true,
        pilha: false,
        plastico: false,
        bateria: false,
        vidro: false,
        papel: true
    },
    {
        id: 2,
        nome: "Ponto de Pilhas e Baterias",
        latitude: -22.8800,
        longitude: -47.1000,
        oleo: false,
        pilha: true,
        plastico: false,
        bateria: true,
        vidro: false,
        papel: false
    },
    {
        id: 3,
        nome: "Reciclagem Geral (Plástico e Vidro)",
        latitude: -22.9300,
        longitude: -47.0500,
        oleo: false,
        pilha: false,
        plastico: true,
        bateria: false,
        vidro: true,
        papel: false
    },
    {
        id: 4,
        nome: "Cooperativa de Óleo e Vidro",
        latitude: -22.9150,
        longitude: -47.0850,
        oleo: true,
        pilha: false,
        plastico: false,
        bateria: false,
        vidro: true,
        papel: false
    }
    // DICA: Adicione mais pontos com diferentes combinações para testar melhor!
];