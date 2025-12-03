// src/components/Routes/Guiadareciclagem.jsx
import React from "react";

const Guiadareciclagem = () => {
  return (
    <div className="auth-page">
      <div className="auth-wrapper guia-wrapper">

        <h1 className="title">Guia de Reciclagem ♻️</h1>
        <p className="subtitle">
          Aprenda como preparar corretamente cada tipo de material antes da reciclagem.
        </p>

        <section className="input-group" style={{ marginTop: "18px" }}>
          <label>🟦 Plásticos</label>
          <ul className="list-disc ml-6 text-[14px] text-gray-700 space-y-1">
            <li>Enxágue para remover resíduos.</li>
            <li>Esvazie garrafas e aperte para reduzir espaço.</li>
          </ul>
        </section>

        <section className="input-group">
          <label>🟩 Vidro</label>
          <ul className="list-disc ml-6 text-[14px] text-gray-700 space-y-1">
            <li>Lave bem para retirar restos líquidos.</li>
            <li>Separe tampas metálicas.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Guiadareciclagem;
