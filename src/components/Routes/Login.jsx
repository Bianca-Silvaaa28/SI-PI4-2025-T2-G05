//autor(a): Miquéias
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../api.js"
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// Define o componente funcional Login
export default function Login() {
  // Hook para controlar a navegação programática entre rotas
  const navigate = useNavigate();

  // Estados do Formulário (Inputs)
  // armazena o valor digitado no campo de email
  const [email, setEmail] = useState("");
  // armazena o valor digitado no campo de senha
  const [senha, setSenha] = useState("");

  //  Estados de Validação 
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Função utilitária para marcar um campo como "tocado" (interagido)
  const markTouched = (field) => {
    // Atualiza o estado 'touched', mantendo os campos anteriores e marcando o campo atual como true
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Função principal de validação do formulário
  const validate = () => {
    // Objeto local para armazenar os erros encontrados durante a validação
    const e = {};

    // Validação do campo Email
    if (!email.trim()) e.email = "O campo de email é obrigatório.";
    // Regex simples para verificar o formato básico do email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Inclua um email válido.";

    // Validação do campo Senha
    if (!senha.trim()) e.senha = "O campo de senha é obrigatório.";
    else if (senha.length < 8)
      e.senha = "A senha deve ter pelo menos 8 caracteres.";

    // Atualiza o estado global de erros com os erros encontrados
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Hook useEffect: Executa a validação sempre que 'email' ou 'senha' mudarem
  useEffect(() => {
    setIsValid(validate());
  }, [email, senha]);

  // Função assíncrona para lidar com a submissão do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Se o usuário clicar em "Entrar" sem interagir, marca ambos os campos como tocados
    // Isso força a exibição imediata das mensagens de erro se os campos estiverem vazios
    setTouched({
      email: true,
      senha: true,
    });

    // Executa a validação final. Se houver erros, interrompe o processo de login
    if (!validate()) return;

    // Bloco try-catch para lidar com a chamada assíncrona de login
    try {
      // Chama a função do Firebase para autenticar o usuário com o email e senha fornecidos
      await signInWithEmailAndPassword(auth, email, senha);
      // Exibe um alerta de sucesso
      alert("Login realizado com sucesso!");
      // Redireciona o usuário para a rota "/home"
      navigate("/home");
    } catch (error) {
      // Em caso de erro na autenticação, exibe um alerta de erro
      alert("Login não efetuado, revise os dados");
    }
  };

  //  Renderização do Componente 
  return (
    // Contêiner principal da página de autenticação
    <div className="auth-page">
      {/* Wrapper para centralizar o formulário e conteúdo */}
      <div className="auth-wrapper">

        {/* Título e Subtítulo da aplicação */}
        <h1 className="title">Ecolink</h1>
        <h2 className="subtitle">Bem-vindo 🌱</h2>

        {/* Formulário de Login. O evento onSubmit chama a função handleLogin */}
        <form onSubmit={handleLogin}>

          {/* Email Input Group */}
          {/* Adiciona a classe 'error' se houver erro no email E o campo tiver sido tocado */}
          <div className={`input-group ${errors.email && touched.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email} // Valor controlado pelo estado 'email'
              // Atualiza o estado 'email' a cada mudança no input
              onChange={(e) => setEmail(e.target.value)}
              // Marca o campo como tocado ao iniciar a digitação
              onInput={() => markTouched("email")}
            />
            {/* Exibe a mensagem de erro se houver erro E o campo tiver sido tocado */}
            {errors.email && touched.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Senha Input Group */}
          {/* Adiciona a classe 'error' se houver erro na senha E o campo tiver sido tocado */}
          <div className={`input-group ${errors.senha && touched.senha ? "error" : ""}`}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={senha} // Valor controlado pelo estado 'senha'
              // Atualiza o estado 'senha' a cada mudança no input
              onChange={(e) => setSenha(e.target.value)}
              // Marca o campo como tocado ao iniciar a digitação
              onInput={() => markTouched("senha")}
            />
            {/* Exibe a mensagem de erro se houver erro E o campo tiver sido tocado */}
            {errors.senha && touched.senha && (
              <small className="error">{errors.senha}</small>
            )}
          </div>

          {/* Botão de Submissão (Login) */}
          <button
            className="btn"
            type="submit"
            // Desabilita o botão se houver erros de validação
            disabled={!isValid}
          >
            Entrar
          </button>

          {/* Link para Redirecionamento (Cadastro) */}
          <p className="redirect">
            Ainda não tem conta?
            {/* Link que usa 'navigate' para ir para a rota de cadastro */}
            <a onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
              Cadastre-se
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}