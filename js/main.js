let map;
let markers = L.layerGroup(); // Agrupa marcadores para fácil limpeza

// FUNÇÃO DE INICIALIZAÇÃO DO MAPA 
document.addEventListener('DOMContentLoaded', () => {
    // Ponto central do mapa 
    const coordenadasIniciais = { lat: -22.8943, lng: -47.0691 };

    // Inicializa o mapa Leaflet na div #map
    map = L.map('map').setView([coordenadasIniciais.lat, coordenadasIniciais.lng], 13);

    // Adiciona as "tiles" (camadas) do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona o LayerGroup de marcadores ao mapa
    markers.addTo(map);

    // Inicializa a lógica de clique dos botões
    iniciarBotoesFiltro();
});


// FUNÇÃO QUE LIMPA PINS E ADICIONA NOVOS 
function atualizarMapa(cooperativas) {
    // Limpar os marcadores antigos
    markers.clearLayers();

    // Adicionar os novos marcadores (pins)
    if (cooperativas && cooperativas.length > 0) {
        cooperativas.forEach(coop => {
            const marker = L.marker([coop.latitude, coop.longitude])
                .bindPopup(`<h3>${coop.nome}</h3>`); // Adiciona o balão de informação

            // Adiciona o marcador ao LayerGroup
            markers.addLayer(marker);
        });

        // Centraliza o mapa no primeiro ponto filtrado
        map.setView([cooperativas[0].latitude, cooperativas[0].longitude], 13);
    }
}


// LÓGICA DE CLIQUE NOS BOTÕES (Mantém a lógica de filtros)
function iniciarBotoesFiltro() {
    const botoesFiltro = document.querySelectorAll('.botao-filtro');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const material = botao.id;

            // Limpa o estado 'ativo' de todos os botões
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            // Adiciona o estado 'ativo' no botão clicado
            botao.classList.add('ativo');

            // Chama a simulação da API com o filtro
            buscarCooperativasMockadas(material)
                .then(dadosRecebidos => {
                    // Recebe os dados e atualiza o mapa 
                    atualizarMapa(dadosRecebidos);
                })
                .catch(erro => {
                    console.error("Erro ao processar filtro:", erro);
                });
        });
    });
}