import { BrowserRouter, Routes, Route } from "react-router-dom"; // importa os componentes essenciais para configurar o roteamento (rotas) no react
import Navbar from "./components/Navbar/Navbar"; // importa o componente de barra de navegação
import Home from "./components/Routes/Home"; // importa o componente da página inicial
import Coleta from "./components/Routes/Coleta"; // importa o componente da página de agendamento de coleta
import Dashboard from "./components/Routes/Dashboard"; // importa o componente da página de dashboard
import Guiadareciclagem from "./components/Routes/Guiadareciclagem"; // importa o componente da página do guia de reciclagem
import Sucesso from "./components/Routes/Sucesso"; // importa o componente da página de sucesso após o agendamento

// define o componente funcional principal da aplicação
function App() {
    // retorna o jsx que define a estrutura da aplicação
    return (
        // container principal: min-h-screen (altura mínima da tela), bg-green-200 (fundo verde claro)
        <div className="min-h-screen bg-green-200">
            {/* o router principal: torna a navegação no estilo spa (single page application) possível */}
            <BrowserRouter>
                <Navbar /> {/* renderiza a barra de navegação (aparece em todas as rotas) */}

                {/* o componente routes envolve todos os elementos de rota */}
                <Routes>
                    {/* define a rota inicial ("/") e associa o componente home a ela */}
                    <Route path="/" element={<Home />} />
                    {/* define a rota "/coleta" e associa o componente coleta a ela */}
                    <Route path="/coleta" element={<Coleta />} />
                    {/* define a rota "/dashboard" e associa o componente dashboard a ela */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* define a rota "/guia" e associa o componente guiadareciclagem a ela */}
                    <Route path="/guia" element={<Guiadareciclagem />} />
                    {/* define a rota "/sucesso" e associa o componente sucesso a ela */}
                    <Route path="/sucesso" element={<Sucesso />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App; // exporta o componente principal da aplicação