import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../api";
import { useNavigate } from "react-router-dom";

const Coleta = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "coletas"), {
        nome,
        data,
        hora,
        endereco,
        numero,
        cep,
        tipo,
        createdAt: new Date(),
      });

      navigate("/sucesso");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Agendar Coleta</h2>
      <form onSubmit={handleSubmit}>

        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Data da coleta</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

        <label>Horário da coleta</label>
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

        <label>Endereço</label>
        <input value={endereco} onChange={(e) => setEndereco(e.target.value)} required />

        <label>Número</label>
        <input
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />

        <label>CEP</label>
        <input
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength="8"
          required
        />

        <label>Tipo da coleta</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">Selecione...</option>
          <option value="Recicláveis">Recicláveis</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Orgânicos">Orgânicos</option>
          <option value="Vidro">Vidro</option>
          <option value="Metal">Metal</option>
        </select>

        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default Coleta;
