//autor(a): Nayla

import React, { useEffect, useState } from "react"; 
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import { auth, db } from "../../api.js"; 

// define o componente funcional dashboard
const Dashboard = () => {
    // estado para armazenar a lista de todas as coletas 
    const [coletas, setColetas] = useState([]);

    // hook useeffect para executar código após a renderização e lidar com efeitos colaterais (conexão com o firestore)
    useEffect(() => {
        const user = auth.currentUser; // Obtém o usuário logado

        if (!user) {
            // Se o usuário não estiver logado, não busca dados
            console.log("Usuário não está logado. Impossível carregar o Dashboard.");
            setColetas([]);
            return;
        }

        // FILTRO DE SEGURANÇA: busca apenas documentos onde o campo 'uidUsuario' é igual ao ID do usuário logado.
        const q = query(
            collection(db, "coletas"),
            where("uidUsuario", "==", user.uid)
        );

        // configura o listener em tempo real (onsnapshot) usando a query filtrada 'q'
        const unsub = onSnapshot(q, (snapshot) => {
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
    }, []); // array de dependências vazio, pois o 'auth.currentUser' não muda durante a sessão


    // calcula o número total de coletas
    const totalColetas = coletas.length;
    
    // Calcula as contagens (usando 'tipoMaterial' como base, ajuste se necessário)
    const totalPapel = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "papel").length;
    const totalPlastico = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "plastico").length;
    const totalMetal = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "metal").length;
    const totalVidro = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "vidro").length;
    const totalOrganico = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "organico").length;
    const totalEletronico = coletas.filter(item => item.tipoMaterial?.toLowerCase() === "eletronico").length;

    //  renderização do componente 
    return (
        <div className="p-6 space-y-6"> {/* container principal com padding e espaçamento vertical (tailwind css) */}

            {/* cards resumidos / métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* card: total de coletas */}
                <div className="bg-green-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Total de coletas</h2>
                    <p className="text-3xl font-bold">{totalColetas}</p> {/* exibe o total calculado */}
                </div>

                {/* card: papel */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Papel</h2>
                    <p className="text-3xl font-bold">{totalPapel}</p> {/* exibe o total de papel */}
                </div>

                {/* card: plástico */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Plástico</h2>
                    <p className="text-3xl font-bold">{totalPlastico}</p> {/* exibe o total de plástico */}
                </div>

                {/* card: metal */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Metal</h2>
                    <p className="text-3xl font-bold">{totalMetal}</p> {/* exibe o total de metal */}
                </div>

                {/* card: vidro */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Vidro</h2>
                    <p className="text-3xl font-bold">{totalVidro}</p> {/* exibe o total de vidro */}
                </div>

                {/* card: organico */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Orgânico</h2>
                    <p className="text-3xl font-bold">{totalOrganico}</p> {/* exibe o total de organico */}
                </div>

                {/* card: eletronico */}
                <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
                    <h2 className="font-bold text-lg">Eletrônico</h2>
                    <p className="text-3xl font-bold">{totalEletronico}</p> {/* exibe o total de eletronico */}
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