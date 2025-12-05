import React from "react"; // importa a biblioteca principal do react
import { Link } from "react-router-dom"; // importa o componente link do react-router-dom para navegação interna sem recarregar a página

// define o componente funcional navbar
const Navbar = () => {
    // retorna o jsx (estrutura html) do componente
    return (
        // a tag <nav> define a barra de navegação
        // classes tailwind: w-full (largura total), bg-green-600 (fundo verde escuro), text-white (texto branco), p-4 (padding em todos os lados), shadow-md (sombra média)
        <nav className="w-full bg-green-600 text-white p-4 shadow-md">
            {/* div container principal para centralizar e limitar a largura do conteúdo */}
            {/* classes tailwind: max-w-6xl (largura máxima), mx-auto (centraliza horizontalmente), flex (display flex), justify-between (espaço entre os itens), items-center (centraliza verticalmente) */}
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* logo / home */}
                {/* o componente link é usado para navegar para a página inicial ("/") */}
                <Link
                    to="/" // define o destino da navegação (página inicial)
                    // classes tailwind: text-2xl (tamanho do texto), font-bold (negrito), tracking-wide (espaçamento entre letras), hover:text-green-200 (muda a cor ao passar o mouse), transition (adiciona transição suave)
                    className="text-2xl font-bold tracking-wide hover:text-green-200 transition"
                >
                    ecolink {/* texto ou logo da aplicação */}
                </Link>

                {/* menu de navegação */}
                {/* lista não ordenada para os itens do menu */}
                {/* classes tailwind: flex (display flex), gap-6 (espaçamento de 6 unidades entre os itens), text-sm (tamanho do texto pequeno), font-medium (peso da fonte médio) */}
                <ul className="flex gap-6 text-sm font-medium">
                    <li> {/* item da lista para o dashboard */}
                        {/* link para a rota /dashboard */}
                        <Link to="/dashboard" className="hover:text-green-200">dashboard</Link>
                    </li>
                    <li> {/* item da lista para registrar coleta */}
                        {/* link para a rota /coleta */}
                        <Link to="/coleta" className="hover:text-green-200">registrar coleta</Link>
                    </li>
                    <li> {/* item da lista para o guia de reciclagem */}
                        {/* link para a rota /guiadareciclagem */}
                        <Link to="/guiadareciclagem" className="hover:text-green-200">guia de reciclagem</Link>
                    </li>
                    <li> {/* item da lista para aprendizagem */}
                        {/* link para a rota /aprendizagem */}
                        <Link to="/aprendizagem" className="hover:text-green-200">
                            aprendizagem
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; // exporta o componente para que ele possa ser usado em outras partes da aplicação