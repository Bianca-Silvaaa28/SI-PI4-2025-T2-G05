import React, { useState } from "react"; // importa react e o hook usestate para gerenciar estados
import { addDoc, collection } from "firebase/firestore"; // importa funções do firestore para adicionar um documento e referenciar uma coleção
import { db } from "../../api"; // importa a instância de conexão do firestore (db) configurada em api.js
import { useNavigate } from "react-router-dom"; // importa o hook usenavigate do react-router-dom para navegação programática

// define o componente funcional coleta
const Coleta = () => {
    // declaração de variáveis de estado usando usestate para capturar os dados do formulário
    const [nome, setNome] = useState(""); // estado para o nome do solicitante
    const [data, setData] = useState(""); // estado para a data da coleta
    const [hora, setHora] = useState(""); // estado para a hora da coleta
    const [endereco, setEndereco] = useState(""); // estado para o endereço
    const [numero, setNumero] = useState(""); // estado para o número do endereço
    const [cep, setCep] = useState(""); // estado para o cep
    const [tipo, setTipo] = useState(""); // estado para o tipo de material a ser coletado

    const navigate = useNavigate(); // inicializa o hook de navegação

    // função que lida com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // previne o comportamento padrão de recarregar a página ao enviar o formulário

        try {
            // chama a função adddoc para salvar os dados no firestore
            await addDoc(
                collection(db, "coletas"), // obtém a referência da coleção "coletas" no banco de dados (db)
                {
                    // objeto com os dados do formulário a serem salvos
                    nome,
                    data,
                    hora,
                    endereco,
                    numero,
                    cep,
                    tipo,
                    createdAt: new Date(), // adiciona um carimbo de data/hora de criação
                }
            );

            // se o salvamento for bem-sucedido, navega para a rota "/sucesso"
            navigate("/sucesso");
        } catch (error) {
            // se houver um erro, imprime no console
            console.error("erro ao salvar:", error);
        }
    };

    // retorna o jsx (estrutura do formulário)
    return (
        <div className="form-container"> {/* container principal do formulário */}
            <h2>agendar coleta</h2> {/* título do formulário */}
            <form onSubmit={handleSubmit}> {/* o formulário chama handlesubmit no envio */}

                <label>nome</label> {/* rótulo para o campo nome */}
                {/* input: o valor é controlado pela variável 'nome', e o onchange atualiza o estado 'nome' */}
                <input value={nome} onChange={(e) => setNome(e.target.value)} required />

                <label>data da coleta</label>
                {/* input tipo data: controla a variável 'data' */}
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

                <label>horário da coleta</label>
                {/* input tipo hora: controla a variável 'hora' */}
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

                <label>endereço</label>
                {/* input: controla a variável 'endereco' */}
                <input value={endereco} onChange={(e) => setEndereco(e.target.value)} required />

                <label>número</label>
                {/* input tipo número: controla a variável 'numero' */}
                <input
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                />

                <label>cep</label>
                {/* input: controla a variável 'cep', com limite máximo de 8 caracteres */}
                <input
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength="8"
                    required
                />

                <label>tipo da coleta</label>
                {/* select (dropdown) para escolher o tipo de material, controla a variável 'tipo' */}
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">selecione...</option> {/* opção padrão desabilitada */}
                    <option value="recicláveis">recicláveis</option>
                    <option value="eletrônicos">eletrônicos</option>
                    <option value="orgânicos">orgânicos</option>
                    <option value="vidro">vidro</option>
                    <option value="metal">metal</option>
                </select>

                <button type="submit">agendar</button> {/* botão de envio do formulário */}
            </form>
        </div>
    );
};

export default Coleta; // exporta o componente para ser usado em rotas