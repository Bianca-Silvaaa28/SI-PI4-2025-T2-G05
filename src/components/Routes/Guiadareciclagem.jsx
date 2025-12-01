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

      {/* Plástico */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🟦 Plásticos</h2>
        <ul className="list-disc ml-6">
          <li>Retire toda a sujeira ou resíduos de alimentos.</li>
          <li>Enxágue com água rapidamente.</li>
          <li>Esvazie garrafas e aperte para ocupar menos espaço.</li>
        </ul>
      </section>

      {/* Vidro */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🟩 Vidros</h2>
        <ul className="list-disc ml-6">
          <li>Lave bem para remover restos de líquido.</li>
          <li>Retire tampas metálicas — elas vão para o metal.</li>
          <li>NÃO recicle vidros quebrados sem proteção (enrole em jornal).</li>
        </ul>
      </section>

      {/* Papel */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">⬜ Papel</h2>
        <ul className="list-disc ml-6">
          <li>Papel molhado ou engordurado não pode ser reciclado.</li>
          <li>Remova grampos e clipes se possível.</li>
          <li>Dobre para ficar compacto.</li>
        </ul>
      </section>

      {/* Metal */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">⬛ Metal</h2>
        <ul className="list-disc ml-6">
          <li>Lave latas e retire restos de alimento.</li>
          <li>Amasse latas de alumínio para reduzir o volume.</li>
        </ul>
      </section>

      {/* Eletrônicos */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">⚡ Eletrônicos</h2>
        <ul className="list-disc ml-6">
          <li>NÃO descarte no lixo comum.</li>
          <li>Leve a pontos de coleta específicos (ecopontos ou lojas autorizadas).</li>
        </ul>
      </section>
    </div>
  );
};

export default Guiadareciclagem;
