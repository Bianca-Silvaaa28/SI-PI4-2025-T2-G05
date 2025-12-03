import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Api";
import Map from "./Map";

const Home = () => {
  const [dailyTip, setDailyTip] = useState("");
  const [coletas, setColetas] = useState([]);

  const tips = [
    "Feche a torneira ao escovar os dentes para economizar água.",
    "Desligue aparelhos da tomada para evitar consumo em standby.",
    "Aproveite a luz natural ao máximo.",
    "Separe o lixo reciclável corretamente todos os dias.",
    "Evite usar descartáveis quando possível.",
    "Plante uma árvore ou cuide de uma planta em casa.",
    "Reduza o tempo de banho para economizar água.",
    "Use transporte coletivo ou bicicleta quando possível.",
    "Reutilize embalagens antes de descartar.",
    "Doe roupas que você não usa mais.",
  ];

  // Gerar dica aleatória
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setDailyTip(tips[randomIndex]);
  }, []);

  // Carregar coletas DO USUÁRIO LOGADO
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setColetas([]); // evita lixo visual
      return;
    }

    const q = query(
        collection(db, "coletas"),
        where("uidUsuario", "==", user.uid)
      );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setColetas(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">

      {/* TÍTULO */}
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        ECO LINK
      </h1>

      {/* DICA DO DIA */}
      <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold">🌱 Dica do Dia</h2>
        <p className="text-gray-700">{dailyTip}</p>
      </div>

      {/* LISTA DE COLETAS */}
      <h2 className="text-2xl font-semibold mb-3">
        📦 Suas Coletas Agendadas
      </h2>

      {coletas.length === 0 ? (
        <p className="text-gray-500">Nenhuma coleta agendada...</p>
      ) : (
        <ul className="space-y-3">
          {coletas.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded shadow border border-gray-200"
            >
              <p><strong>Nome:</strong> {item.nome}</p>
              <p><strong>Data:</strong> {item.data}</p>
              <p><strong>Hora:</strong> {item.hora}</p>
              <p><strong>CEP:</strong> {item.cep}</p>
              <p><strong>Endereço:</strong> {item.endereco}, {item.numero}</p>
              <p><strong>Tipo:</strong> {item.tipo}</p>
            </li>
          ))}
        </ul>
      )}

      {/* MAPA — EXIBE APENAS AS DO USUÁRIO */}
      <Map coletas={coletas} />
    </div>
  );
};

export default Home;
