import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../Api";
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

    const user = auth.currentUser;

    if (!user) {
      alert("Você precisa estar logado para agendar uma coleta!");
      return;
    }

    try {
      await addDoc(collection(db, "coletas"), {
        nome,
        data,
        hora,
        endereco,
        numero,
        cep,
        tipo,
        emailUsuario: user.email,
        uidUsuario: user.uid,
        createdAt: new Date(),
      });

      navigate("/sucesso");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <h2 className="title">Agendar Coleta</h2>
        <p className="subtitle">Preencha os dados para realizar o agendamento</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Data da coleta</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Horário da coleta</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Número</label>
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>CEP</label>
            <input
              type="text"
              maxLength="8"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Tipo da coleta</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="Recicláveis">Recicláveis</option>
              <option value="Eletrônico">Eletrônico</option>
              <option value="Orgânicos">Orgânicos</option>
              <option value="Vidro">Vidro</option>
              <option value="Metal">Metal</option>
              <option value="Papel">Papel</option>
              <option value="Plastico">Plastico</option>

            </select>
          </div>

          <button type="submit" className="btn">
            Agendar
          </button>

        </form>
      </div>
    </div>
  );
};

export default Coleta;
