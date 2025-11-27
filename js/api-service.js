// js/api-service.js
// O array COOPERATIVAS_MOCKADAS é acessado pois foi carregado primeiro no HTML.

/**
 * Simula a chamada GET /api/cooperativas?material=FILTRO
 * @param {string} material - O filtro clicado (ex: 'oleo', 'pilha').
 * @returns {Promise<Array>} - Uma lista de cooperativas filtradas.
 */
function buscarCooperativasMockadas(material) {
    return new Promise(resolve => {
        // Simula o tempo de espera de uma rede
        setTimeout(() => {

            // Filtra o array onde o campo 'material' (ex: coop['oleo']) é true
            const resultadosFiltrados = COOPERATIVAS_MOCKADAS.filter(coop => coop[material] === true);

            // Devolve os dados filtrados
            resolve(resultadosFiltrados);

        }, 300);
    });
}