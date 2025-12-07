// autor(a): Nayla e Miquéias

import React, { useState } from "react"; 
import { addDoc, collection } from "firebase/firestore"; 
import { auth, db } from "../../api.js" 
import { useNavigate } from "react-router-dom"; 

// define o componente funcional coleta
const Coleta = () => {
    // definição de variáveis de estado
    const [nome, setNome] = useState(""); 
    const [data, setData] = useState(""); 
    const [hora, setHora] = useState(""); 
    const [endereco, setEndereco] = useState(""); 
    const [numero, setNumero] = useState(""); 
    const [cep, setCep] = useState(""); 
    const [tipo, setTipo] = useState(""); 

    const navigate = useNavigate();

    // função que lida com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Obtém o usuário logado
        const user = auth.currentUser;
        if (!user) {
            alert("Você precisa estar logado para agendar uma coleta!");
            return;
        }

        try {
            await addDoc(
                collection(db, "coletas"), 
                {
                    nome,
                    data,
                    hora,
                    endereco,
                    numero,
                    cep,
                    tipo,
                    uidUsuario: user.uid, 
                    emailUsuario: user.email,
                    createdAt: new Date(), 
                }
            );

            navigate("/sucesso"); 
        } catch (error) {
            console.error("erro ao salvar:", error);
            alert("Erro ao agendar coleta: " + error.message);
        }
    };

    return (
        // Container principal com layout centralizado
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8"> 
            <h2 className="text-3xl font-bold mb-6 text-green-700">Agendar Coleta</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4"> {/* Adiciona espaçamento vertical */}

                {/* Grid para alinhar em até 3 colunas (corrige a desconfiguração horizontal) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Input: Nome */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>

                    {/* Input: Data */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Data da coleta</label>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>
                    
                    {/* Input: Horário */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Horário da coleta</label>
                        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>

                    {/* Input: Endereço */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Endereço</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>

                    {/* Input: Número */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Número</label>
                        <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>

                    {/* Input: CEP */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">CEP</label>
                        <input value={cep} onChange={(e) => setCep(e.target.value)} maxLength="8" required 
                               className="p-2 border border-gray-300 rounded focus:border-green-500"/>
                    </div>
                    
                    {/* Select: Tipo de Coleta */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">Tipo da coleta</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required 
                                className="p-2 border border-gray-300 rounded focus:border-green-500">
                            <option value="">selecione...</option>
                            <option value="Recicláveis">Recicláveis</option>
                            <option value="Eletrônicos">Eletrônicos</option>
                            <option value="Orgânicos">Orgânicos</option>
                            <option value="Vidro">Vidro</option>
                            <option value="Metal">Metal</option>
                        </select>
                    </div>
                </div>

                {/* Botão de Envio */}
                <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition">
                    Agendar
                </button>
            </form>
        </div>
    );
};

export default Coleta;