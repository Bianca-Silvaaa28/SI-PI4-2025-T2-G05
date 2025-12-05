import React, { useEffect, useState } from "react"; // importa react e os hooks usestate e useeffect
import { collection, onSnapshot } from "firebase/firestore"; // importa funções do firestore: collection (referência à coleção) e onsnapshot (listener em tempo real)
import { db } from "../../api.js"; // importa a instância de conexão do firestore (db)

// define o componente funcional dashboard
const Dashboard = () => {
    // estado para armazenar a lista de todas as coletas (objetos { id, ...dados })
    const [coletas, setColetas] = useState([]);

    // hook useeffect para executar código após a renderização e lidar com efeitos colaterais (conexão com o firestore)
    useEffect(() => {
        // configura o listener em tempo real (onsnapshot) para a coleção "coletas"
        const unsub = onSnapshot(collection(db, "coletas"), (snapshot) => {
            // mapeia os documentos retornados do firestore (snapshot.docs)
            const lista = snapshot.docs.map(doc => ({
                id: doc.id, // inclui o id do documento
                ...doc.data() // inclui os dados do documento
            }));
            // atualiza o estado com a nova lista de coletas
            setColetas(lista);
        });

        // função de limpeza: retorna uma função que cancela a inscrição (listener) quando o componente for desmontado
        return () => unsub();
    }, []); // array de dependências vazio: o efeito é executado apenas uma vez, após a montagem inicial

    // ********** lógica de cálculo resumido **********
    // calcula o número total de coletas
    const totalColetas = coletas.length;
    // calcula o número total de coletas do tipo "papel" usando filter
    // nota: o campo 'tipo' foi usado em 'coleta.jsx', aqui está sendo usado 'tipomaterial'
    const totalPapel = coletas.filter(item => item.tipoMaterial === "papel").length;
    // calcula o número total de coletas do tipo "plástico"
    const totalPlastico = coletas.filter(item => item.tipoMaterial === "plastico").length;

    // ********** renderização do componente **********
    return (
        <div className="p-6 space-y-6"> {/* container principal com padding e espaçamento vertical (tailwind css) */}

            {/* cards resumidos / métricas */}
            {/* grid responsivo: 1 coluna em telas pequenas, 3 colunas em telas médias ou maiores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* card: total de coletas */}
                <div className="bg-green-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">total de coletas</h2>
                    <p className="text-3xl font-bold">{totalColetas}</p> {/* exibe o total calculado */}
                </div>

                {/* card: papel */}
                <div className="bg-blue-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">papel</h2>
                    <p className="text-3xl font-bold">{totalPapel}</p> {/* exibe o total de papel */}
                </div>

                {/* card: plástico */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">plástico</h2>
                    <p className="text-3xl font-bold">{totalPlastico}</p> {/* exibe o total de plástico */}
                </div>

            </div>

            {/* lista de últimas coletas */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-bold text-lg mb-4">últimas coletas</h2>

                {/* renderização condicional: verifica se há coletas */}
                {coletas.length === 0 ? (
                    // se não houver coletas, exibe uma mensagem
                    <p className="text-gray-500">nenhuma coleta registrada.</p>
                ) : (
                    // se houver coletas, exibe uma lista
                    <ul className="space-y-3">
                        {/* mapeia os 5 primeiros itens da lista de coletas (slice(0, 5)) */}
                        {coletas.slice(0, 5).map(item => (
                            <li key={item.id} className="border-b pb-2"> {/* chave única para cada item */}
                                <strong>{item.nome}</strong> — {item.tipoMaterial} <br />
                                <span className="text-sm text-gray-600">
                                    data: {String(item.data)} {/* exibe a data da coleta */}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

export default Dashboard; // exporta o componente dashboard