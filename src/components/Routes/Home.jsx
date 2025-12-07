import React, { useEffect, useState, useMemo } from "react";
// Importações de Firebase para o monitoramento de autenticação
import { auth } from "../../api"; 
import Map from "./Map";

// Definição dos tipos de materiais para o filtro
const tiposMateriais = [
    "Recicláveis",
    "Eletronico",
    "Orgânicos",
    "Vidro",
    "Metal",
    "Papel",
    "Plástico",
];

const Home = () => {
    const [dailyTip, setDailyTip] = useState("");
    
    // Para Coletas Agendadas (lista do usuário, via API Java)
    const [coletas, setColetas] = useState([]); 
    
    // Para Cooperativas (pontos do mapa, via API Java)
    const [cooperativas, setCooperativas] = useState([]); 
    
    // Para o filtro de materiais
    const [selectedFilter, setSelectedFilter] = useState(""); 
    
    // Estados para controle de autenticação
    const [userToken, setUserToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

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

    // Dica aleatória
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        setDailyTip(tips[randomIndex]);
    }, []);

    // Monitora a autenticação e obtém o token JWT
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken(); 
                setUserToken(token);
            } else {
                setUserToken(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);


    // Carrega COOPERATIVAS (Pontos do Mapa) do Servidor Java
    useEffect(() => {
        const fetchCooperativas = async () => {
            try {
                // Busca de dados públicos do Back-End
                const response = await fetch("http://localhost:8080/api/cooperativas"); 
                
                if (!response.ok) {
                    throw new Error(`Erro ao buscar Cooperativas (HTTP status: ${response.status})`);
                }
                
                const lista = await response.json();
                setCooperativas(lista); 
                
            } catch (err) {
                console.error("Erro ao buscar Cooperativas do servidor Java:", err);
            }
        };

        fetchCooperativas();
    }, []); 

    // Carrega COLETAS AGENDADAS (Lista do USUÁRIO)
    useEffect(() => {
        if (!userToken && !isLoading) {
            setColetas([]);
            return;
        }

        if (userToken) {
            const fetchMinhasColetas = async () => {
                 try {
                     const response = await fetch("http://localhost:8080/api/coletas/minhas", {
                        headers: { 'Authorization': `Bearer ${userToken}` }
                    }); 
                    
                    if (!response.ok) {
                        setColetas([]);
                        return;
                    }
                    
                    const lista = await response.json();
                    setColetas(lista); 
                    
                } catch (err) {
                    console.error("Erro ao buscar minhas coletas:", err);
                    setColetas([]);
                }
            };

            fetchMinhasColetas();
        }
    }, [userToken, isLoading]);
    
    // Lógica para filtrar as cooperativas (useMemo)
    const filteredCooperativas = useMemo(() => {
        if (!selectedFilter) {
            return cooperativas;
        }
        // Filtra os pontos onde a lista 'materiais' inclui o filtro selecionado
        return cooperativas.filter(coop => 
            coop.materiais && coop.materiais.includes(selectedFilter)
        );
    }, [cooperativas, selectedFilter]);


    if (isLoading) {
        return <div className="p-6 text-xl text-green-700">verificando autenticação e carregando dados...</div>;
    }


    return (
        <div className="p-6">
            {/* Título */}
            <h1 className="text-3xl font-bold mb-4 text-green-600">eco link</h1>

            {/* Dica do dia */}
            <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded mb-6">
                <h2 className="text-xl font-semibold">🌱 dica do dia</h2>
                <p className="text-gray-700">{dailyTip}</p>
            </div>

            {/* MAPA COM COOPERATIVAS */}
            <h2 className="text-2xl font-semibold mb-3">🗺️ mapa dos pontos de coleta</h2>
            
            {/* ELEMENTO DO FILTRO */}
            <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded mb-4"
                style={{ width: "200px" }}
            >
                <option value="">Mostrar todas</option>
                {tiposMateriais.map((tipo, i) => (
                    <option key={i} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
            
            {/* MAPA: Recebe a lista FILTRADA de COOPERATIVAS */}
            <Map coletas={filteredCooperativas} /> 


            {/* Lista de coletas (APENAS DO USUÁRIO LOGADO) */}
            <h2 className="text-2xl font-semibold mb-3 mt-6">📦 coletas agendadas</h2>

            {/* EXIBIÇÃO CONDICIONAL */}
            {userToken === null ? (
                <p className="text-red-500 font-medium">Faça login para ver suas coletas agendadas.</p>
            ) : coletas.length === 0 ? (
                <p className="text-gray-500">nenhuma coleta agendada...</p>
            ) : (
                <ul className="space-y-3">
                    {coletas.map((item) => (
                        <li
                            key={item.id}
                            className="p-4 bg-white rounded shadow border border-gray-200"
                        >
                            <p><strong>nome:</strong> {item.nome}</p>
                            <p><strong>data:</strong> {item.data}</p>
                            {item.hora && (<p><strong>hora:</strong> {item.hora}</p>)}
                            {item.tipo && (<p><strong>material:</strong> {item.tipo}</p>)}
                            {item.cep && (<p><strong>cep:</strong> {item.cep}</p>)}
                            {item.endereco && (<p><strong>endereço:</strong> {item.endereco}</p>)}
                            {item.emailUsuario && (<p><strong>email:</strong> {item.emailUsuario}</p>)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;