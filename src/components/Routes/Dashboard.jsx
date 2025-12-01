import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../api.js";

const Dashboard = () => {
  const [coletas, setColetas] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "coletas"), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setColetas(lista);
    });

    return () => unsub();
  }, []);

  const totalColetas = coletas.length;
  const totalPapel = coletas.filter(item => item.tipoMaterial === "papel").length;
  const totalPlastico = coletas.filter(item => item.tipoMaterial === "plastico").length;

  return (
    <div className="p-6 space-y-6">

      {/* CARDS RESUMIDOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
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
                <strong>{item.nome}</strong> — {item.tipoMaterial} <br />
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
