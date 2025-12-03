import React from "react";

const Guiadareciclagem = () => {
  return (
    <div className="auth-page">
      {/* wrapper personalizado para ficar mais largo */}
      <div className="auth-wrapper guia-wrapper">

        <h2 className="title">Guia de Reciclagem ♻️</h2>
        <p className="subtitle">
          Aprenda como preparar corretamente cada material antes da reciclagem.
        </p>

        <div className="input-group">
          <h3 className="text-lg font-semibold">🟦 Plásticos</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Retire toda a sujeira ou resíduos de alimentos.</li>
            <li>Enxágue rapidamente com água.</li>
            <li>Esvazie garrafas e aperte para ocupar menos espaço.</li>
          </ul>
        </div>

        <div className="input-group">
          <h3 className="text-lg font-semibold">🟩 Vidros</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Lave bem para remover restos de líquidos.</li>
            <li>Retire tampas metálicas — elas vão para o metal.</li>
            <li>NÃO recicle vidros quebrados sem proteção (enrole em jornal).</li>
          </ul>
        </div>

        <div className="input-group">
          <h3 className="text-lg font-semibold">⬜ Papel</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Papel molhado ou engordurado não pode ser reciclado.</li>
            <li>Remova grampos e clipes sempre que possível.</li>
            <li>Dobre para ficar mais compacto.</li>
          </ul>
        </div>

        <div className="input-group">
          <h3 className="text-lg font-semibold">⬛ Metal</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Lave latas e retire restos de alimentos.</li>
            <li>Amasse latas para reduzir o volume.</li>
          </ul>
        </div>

        <div className="input-group">
          <h3 className="text-lg font-semibold">⚡ Eletrônicos</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>NÃO descarte no lixo comum.</li>
            <li>Leve a ecopontos ou lojas autorizadas para coleta correta.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Guiadareciclagem;
