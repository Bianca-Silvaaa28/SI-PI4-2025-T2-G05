import React from "react"; // importa a biblioteca principal do react (embora não use hooks neste arquivo)

// define o componente funcional guiadareciclagem
const Guiadareciclagem = () => {
    // retorna o jsx (estrutura da página)
    return (
        // container principal da página: p-6 (padding), max-w-3xl (largura máxima), mx-auto (centraliza horizontalmente), text-gray-800 (cor do texto)
        <div className="p-6 max-w-3xl mx-auto text-gray-800">

            {/* título principal da página */}
            <h1 className="text-3xl font-bold mb-4">
                guia de reciclagem ♻️
            </h1>

            {/* parágrafo de introdução */}
            <p className="mb-6 text-lg">
                aqui você aprende como preparar corretamente cada tipo de material antes de enviar para reciclagem.
            </p>

            {/* plástico */}
            <section className="mb-6"> {/* seção para plásticos */}
                <h2 className="text-xl font-semibold">🟦 plásticos</h2> {/* subtítulo com ícone (emoji) */}
                <ul className="list-disc ml-6"> {/* lista de instruções */}
                    <li>retire toda a sujeira ou resíduos de alimentos.</li>
                    <li>enxágue com água rapidamente.</li>
                    <li>esvazie garrafas e aperte para ocupar menos espaço.</li>
                </ul>
            </section>

            {/* vidro */}
            <section className="mb-6"> {/* seção para vidros */}
                <h2 className="text-xl font-semibold">🟩 vidros</h2>
                <ul className="list-disc ml-6">
                    <li>lave bem para remover restos de líquido.</li>
                    <li>retire tampas metálicas — elas vão para o metal.</li>
                    <li>não recicle vidros quebrados sem proteção (enrole em jornal).</li> {/* instrução de segurança */}
                </ul>
            </section>

            {/* papel */}
            <section className="mb-6"> {/* seção para papel */}
                <h2 className="text-xl font-semibold">⬜ papel</h2>
                <ul className="list-disc ml-6">
                    <li>papel molhado ou engordurado não pode ser reciclado.</li>
                    <li>remova grampos e clipes se possível.</li>
                    <li>dobre para ficar compacto.</li>
                </ul>
            </section>

            {/* metal */}
            <section className="mb-6"> {/* seção para metal */}
                <h2 className="text-xl font-semibold">⬛ metal</h2>
                <ul className="list-disc ml-6">
                    <li>lave latas e retire restos de alimento.</li>
                    <li>amasse latas de alumínio para reduzir o volume.</li>
                </ul>
            </section>

            {/* eletrônicos */}
            <section className="mb-6"> {/* seção para eletrônicos */}
                <h2 className="text-xl font-semibold">⚡ eletrônicos</h2>
                <ul className="list-disc ml-6">
                    <li>não descarte no lixo comum.</li>
                    <li>leve a pontos de coleta específicos (ecopontos ou lojas autorizadas).</li>
                </ul>
            </section>
        </div>
    );
};

export default Guiadareciclagem; // exporta o componente