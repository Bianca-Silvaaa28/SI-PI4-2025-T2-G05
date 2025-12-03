import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../Api";

const Dashboard = () => {
  const [coletas, setColetas] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      console.log("Usuário não está logado.");
      return;
    }

    const q = query(
      collection(db, "coletas"),
      where("uidUsuario", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setColetas(lista);
    });

    return () => unsub();
  }, []);

  // CONTAGENS POR TIPO
  const totalColetas = coletas.length;

  const totalPapel = coletas.filter(item => item.tipo === "papel" || item.tipoMaterial === "papel").length;
  const totalPlastico = coletas.filter(item => item.tipo === "plastico" || item.tipoMaterial === "plastico").length;
  const totalOrganico = coletas.filter(item => item.tipo === "Orgânicos" || item.tipoMaterial === "organico").length;
  const totalEletronico = coletas.filter(item => item.tipo === "Eletrônicos" || item.tipoMaterial === "eletronico").length;
  const totalReciclaveis = coletas.filter(item => item.tipo === "Recicláveis" || item.tipoMaterial === "reciclavel").length;
  const totalMetais = coletas.filter(item => item.tipo === "Metais" || item.tipoMaterial === "metal").length;
  const totalVidros = coletas.filter(item => item.tipo === "Vidro" || item.tipoMaterial === "Vidro").length;

  return (
    <div className="p-6 space-y-6">

      {/* CARDS RESUMIDOS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-green-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Total de Coletas</h2>
          <p className="text-3xl font-bold">{totalColetas}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Papel</h2>
          <p className="text-3xl font-bold">{totalPapel}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Plástico</h2>
          <p className="text-3xl font-bold">{totalPlastico}</p>
        </div>

        <div className="bg-orange-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Orgânico</h2>
          <p className="text-3xl font-bold">{totalOrganico}</p>
        </div>

        <div className="bg-purple-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Eletrônico</h2>
          <p className="text-3xl font-bold">{totalEletronico}</p>
        </div>

        <div className="bg-teal-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Recicláveis</h2>
          <p className="text-3xl font-bold">{totalReciclaveis}</p>
        </div>

        <div className="bg-teal-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Metais</h2>
          <p className="text-3xl font-bold">{totalMetais}</p>
        </div>

        <div className="bg-teal-100 p-5 rounded-xl shadow-md">
          <h2 className="font-bold text-lg">Vidros</h2>
          <p className="text-3xl font-bold">{totalVidros}</p>
        </div>
      </div>

      {/* ÚLTIMAS COLETAS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="font-bold text-lg mb-4">Últimas Coletas</h2>

        {coletas.length === 0 ? (
          <p className="text-gray-500">Nenhuma coleta registrada.</p>
        ) : (
          <ul className="space-y-3">
            {coletas.slice(0, 5).map(item => (
              <li key={item.id} className="border-b pb-2">
                <strong>{item.nome}</strong> — {item.tipo || item.tipoMaterial} <br />
                <span className="text-sm text-gray-600">
                  Data: {String(item.data)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
