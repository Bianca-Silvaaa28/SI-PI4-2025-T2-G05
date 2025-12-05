import React from "react"; // importa a biblioteca principal do react
import ReactDOM from "react-dom/client"; // importa os métodos específicos para interagir com o dom (document object model) no navegador
import App from "./App.jsx"; // importa o componente principal da aplicação (geralmente contendo todas as rotas e layout)
import "./index.css"; // importa o arquivo de estilos css global para a aplicação

// usa o método 'createroot' para criar uma raiz de renderização concorrente no elemento com id="root" no html
ReactDOM.createRoot(document.getElementById("root")).render(
    // o método 'render' renderiza o componente react dentro da raiz criada
    <React.StrictMode>
        {/* strictmode é um componente que ativa verificações adicionais e avisos no modo de desenvolvimento */}
        <App /> {/* renderiza o componente principal app */}
    </React.StrictMode>
);