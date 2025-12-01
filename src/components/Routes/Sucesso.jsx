// src/components/Routes/Guiadareciclagem.jsx
import React from "react";

const Guiadareciclagem = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">

      <h1 className="text-3xl font-bold mb-4">
        Guia de Reciclagem ♻️
      </h1>

      <p className="mb-6 text-lg">
        Aqui você aprende como preparar corretamente cada tipo de material antes de enviar para reciclagem.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">🟦 Plásticos</h2>
        <ul className="list-disc ml-6">
          <li>Enxágue para remover resíduos.</li>
          <li>Esvazie garrafas e aperte para reduzir espaço.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">🟩 Vidro</h2>
        <ul className="list-disc ml-6">
          <li>Lave bem para retirar restos líquidos.</li>
          <li>Separe tampas metálicas.</li>
        </ul>
      </section>
    </div>
  );
};

export default Guiadareciclagem;
 