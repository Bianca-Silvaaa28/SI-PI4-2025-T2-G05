// src/components/routes/guiadareciclagem.jsx
import React from "react"; // importa a biblioteca principal do react

// define o componente funcional guiadareciclagem
const Guiadareciclagem = () => {
    // retorna o jsx (estrutura da página)
    return (
        // container principal: p-6 (padding), max-w-3xl (largura máxima), mx-auto (centraliza), text-gray-800 (cor do texto)
        <div className="p-6 max-w-3xl mx-auto text-gray-800">

            {/* título principal da página */}
            <h1 className="text-3xl font-bold mb-4">
                guia de reciclagem ♻️
            </h1>

            {/* parágrafo de introdução */}
            <p className="mb-6 text-lg">
                aqui você aprende como preparar corretamente cada tipo de material antes de enviar para reciclagem.
            </p>

            {/* seção: plásticos */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold">🟦 plásticos</h2> {/* subtítulo para plásticos */}
                <ul className="list-disc ml-6"> {/* lista de instruções */}
                    <li>enxágue para remover resíduos.</li>
                    <li>esvazie garrafas e aperte para reduzir espaço.</li>
                </ul>
            </section>

            {/* seção: vidro */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold">🟩 vidro</h2> {/* subtítulo para vidro */}
                <ul className="list-disc ml-6">
                    <li>lave bem para retirar restos líquidos.</li>
                    <li>separe tampas metálicas.</li>
                </ul>
            </section>
        </div>
    );
};

export default Guiadareciclagem; // exporta o componente