//autor(a): Nayla e Miquéias

import React, { useEffect, useState } from "react"; // importa react e os hooks useeffect e usestate
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"; // importa funções do firestore para consultas e listener em tempo real
import { db } from "../../api"; // importa a instância de conexão do firestore (db)
import Map from "./Map"; // importa o componente map (mapa)

// define o componente funcional home
const Home = () => {
    // estado para armazenar a dica ambiental aleatória do dia
    const [dailyTip, setDailyTip] = useState("");
    // estado para armazenar a lista de coletas agendadas
    const [coletas, setColetas] = useState([]);

    // array de strings contendo as dicas ambientais
    const tips = [
        "feche a torneira ao escovar os dentes para economizar água.",
        "desligue aparelhos da tomada para evitar consumo em standby.",
        "aproveite a luz natural ao máximo.",
        "separe o lixo reciclável corretamente todos os dias.",
        "evite usar descartáveis quando possível.",
        "plante uma árvore ou cuide de uma planta em casa.",
        "reduza o tempo de banho para economizar água.",
        "use transporte coletivo ou bicicleta quando possível.",
        "reutilize embalagens antes de descartar.",
        "doe roupas que você não usa mais.",
    ];

    // useeffect para selecionar e exibir uma dica aleatória na montagem
    useEffect(() => {
        // gera um índice aleatório baseado no tamanho do array de dicas
        const randomIndex = Math.floor(Math.random() * tips.length);
        // define o estado da dica do dia com a dica selecionada
        setDailyTip(tips[randomIndex]);
    }, []); // array de dependências vazio: executa apenas uma vez ao montar

    // useeffect para carregar coletas do firebase em tempo real
    useEffect(() => {
        // cria uma query para a coleção "coleta" e ordena os resultados pelo campo "data" em ordem crescente
        const q = query(collection(db, "coleta"), orderBy("data", "asc"));

        // configura o listener em tempo real (onsnapshot)
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // mapeia os documentos retornados, adicionando o id e os dados de cada documento
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // atualiza o estado com a lista de coletas
            setColetas(lista);
        });

        // retorna a função de limpeza: cancela o listener (unsubscribe) quando o componente for desmontado
        return () => unsubscribe();
    }, []); // array de dependências vazio: executa apenas uma vez ao montar

    // ********** renderização do componente **********
    return (
        <div className="p-6"> {/* container principal */}
            {/* título principal */}
            <h1 className="text-3xl font-bold mb-4 text-green-600">eco link</h1>

            {/* dica do dia */}
            <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded mb-6"> {/* card de dica estilizado */}
                <h2 className="text-xl font-semibold">🌱 dica do dia</h2>
                <p className="text-gray-700">{dailyTip}</p> {/* exibe a dica aleatória */}
            </div>

            {/* lista de coletas */}
            <h2 className="text-2xl font-semibold mb-3">📦 coletas agendadas</h2>

            {/* renderização condicional da lista de coletas */}
            {coletas.length === 0 ? (
                <p className="text-gray-500">nenhuma coleta agendada...</p> // mensagem se não houver coletas
            ) : (
                <ul className="space-y-3"> {/* lista de coletas */}
                    {/* mapeia e renderiza cada item de coleta */}
                    {coletas.map((item) => (
                        <li
                            key={item.id} // chave única para o react
                            className="p-4 bg-white rounded shadow border border-gray-200" // estilização do item da lista
                        >
                            <p><strong>nome:</strong> {item.nome}</p>
                            <p><strong>data:</strong> {item.data}</p>

                            {/* renderização condicional dos campos, se existirem */}
                            {item.hora && (
                                <p><strong>hora:</strong> {item.hora}</p>
                            )}

                            {item.material && (
                                <p><strong>material:</strong> {item.material}</p>
                            )}

                            {item.cep && (
                                <p><strong>cep:</strong> {item.cep}</p>
                            )}

                            {item.endereco && (
                                <p><strong>endereço:</strong> {item.endereco}</p>
                            )}

                            {item.email && (
                                <p><strong>email:</strong> {item.email}</p>
                            )}

                            {item.telefone && (
                                <p><strong>telefone:</strong> {item.telefone}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* mapa com coletas */}
            {/* renderiza o componente map e passa a lista de coletas como propriedade (prop) */}
            <Map coletas={coletas} />
        </div>
    );
};

export default Home; // exporta o componente
