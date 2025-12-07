//autor(a): Miquéias
// Importa o React e os Hooks essenciais (useState, useEffect)
import React, { useState, useEffect } from "react";
import { auth, db } from "../../api.js"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// Define o componente funcional Cadastro
export default function Cadastro() {
  // Hook para controlar a navegação programática entre rotas
  const navigate = useNavigate();

  //  Estados do Formulário (Inputs) 
  // armazena o nome completo do usuário
  const [nome, setNome] = useState("");
  // armazena o email digitado
  const [email, setEmail] = useState("");
  // armazena a senha criada
  const [senha, setSenha] = useState("");
  // armazena a confirmação da senha
  const [confirmSenha, setConfirmSenha] = useState("");
  // Estado fixo para definir o tipo de usuário padrão
  const [tipoUsuario] = useState("usuario");

  //  Estados de Validação 
  // Objeto para armazenar as mensagens de erro de cada campo
  const [errors, setErrors] = useState({});
  // Objeto para rastrear se o usuário interagiu (tocou/digitou) em cada campo
  const [touched, setTouched] = useState({});
  // Booleano que indica se o formulário atende a todos os requisitos de validação
  const [isValid, setIsValid] = useState(false);

  // Função utilitária para marcar um campo como "tocado"
  const markTouched = (field) => {
    // Atualiza o estado 'touched', marcando o campo atual como true
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Função principal de validação do formulário
  const validate = () => {
    // Objeto local para armazenar os erros encontrados
    const e = {};

    // Validação do campo Nome
    if (!nome.trim()) e.nome = "Nome é obrigatório.";

    // Validação do campo Email
    if (!email.trim()) e.email = "Email é obrigatório.";
    // Regex simples para verificar o formato básico do email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Email inválido.";

    // Validação do campo Senha
    if (!senha) e.senha = "Senha é obrigatória.";
    // Verifica se a senha tem pelo menos 8 caracteres
    else if (senha.length < 8)
      e.senha = "A senha precisa ter pelo menos 8 caracteres.";

    // Validação do campo Confirmação de Senha
    if (!confirmSenha) e.confirmSenha = "Confirme sua senha.";
    // Verifica se a confirmação de senha é idêntica à senha
    else if (confirmSenha !== senha)
      e.confirmSenha = "As senhas não coincidem.";

    // Atualiza o estado global de erros
    setErrors(e);
    // Retorna true se o objeto de erros estiver vazio, indicando formulário válido
    return Object.keys(e).length === 0;
  };

  // Hook useEffect: Responsável pela validação em tempo real
  useEffect(() => {
    // Executa a validação e atualiza o estado 'isValid'
    setIsValid(validate());
    // Array de dependências: A validação é re-executada sempre que um dos inputs mudar
  }, [nome, email, senha, confirmSenha]);

  // Função assíncrona para lidar com a submissão do formulário
  const handleCadastro = async (e) => {
    // Previne o recarregamento padrão da página
    e.preventDefault();

    // Marca todos os campos como tocados ao tentar enviar
    // garante que todas as mensagens de erro sejam exibidas antes da tentativa de cadastro
    setTouched({
      nome: true,
      email: true,
      senha: true,
      confirmSenha: true,
    });

    // Executa a validação final. Se o formulário não for válido, interrompe a execução
    if (!validate()) return;

    // Bloco try-catch para gerenciar a criação do usuário e a gravação no banco de dados
    try {
      // Criação do usuário no Firebase Authentication
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const user = cred.user; // Obtém o objeto de usuário criado

      // Atualiza o perfil do usuário 
      await updateProfile(user, { displayName: nome });

      // Cria um novo documento no Firestore (Coleção "usuarios")
      // O ID do documento é o UID exclusivo do usuário gerado pelo Firebase Auth
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        tipoUsuario,
        criadoEm: new Date().toISOString(),
      });

      // Exibe mensagem de sucesso e redireciona
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para a página de login
    } catch (error) {
      // Mensagem de erro
      alert("Erro no cadastro: " + error.message);
    }
  };

  //  Renderização do Componente 
  return (
    // Contêiner principal da página
    <div className="auth-page">
      {/* Wrapper para centralizar o formulário */}
      <div className="auth-wrapper">

        {/* Título e Subtítulo */}
        <h1 className="title">Ecolink</h1>
        <h2 className="subtitle">Crie sua conta 🌍</h2>

        {/* Formulário de Cadastro. O evento onSubmit chama handleCadastro */}
        <form onSubmit={handleCadastro}>

          {/* Grupo de Input: Nome */}
          {/* A classe 'error' é adicionada se houver erro E o campo foi tocado */}
          <div className={`input-group ${errors.nome && touched.nome ? "error" : ""}`}>
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onInput={() => markTouched("nome")} // Marca como tocado na interação
            />
            {/* Exibe a mensagem de erro se as condições forem atendidas */}
            {errors.nome && touched.nome && <small className="error">{errors.nome}</small>}
          </div>

          {/* Grupo de Input: Email */}
          <div className={`input-group ${errors.email && touched.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={() => markTouched("email")}
            />
            {errors.email && touched.email && <small className="error">{errors.email}</small>}
          </div>

          {/* Grupo de Input: Senha */}
          <div className={`input-group ${errors.senha && touched.senha ? "error" : ""}`}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onInput={() => markTouched("senha")}
            />
            {errors.senha && touched.senha && <small className="error">{errors.senha}</small>}
          </div>

          {/* Grupo de Input: Confirmar Senha */}
          <div className={`input-group ${errors.confirmSenha && touched.confirmSenha ? "error" : ""}`}>
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita a senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              onInput={() => markTouched("confirmSenha")}
            />
            {errors.confirmSenha && touched.confirmSenha && (
              <small className="error">{errors.confirmSenha}</small>
            )}
          </div>

          {/* Botão de Submissão */}
          <button
            className="btn"
            type="submit"
            // O botão é desabilitado se o formulário não for válido
            disabled={!isValid}
          >
            Cadastrar
          </button>

          {/* Link para Redirecionamento (Login) */}
          <p className="redirect">
            Já tem conta?
            {/* Redireciona para a página de login ao clicar */}
            <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Entre aqui
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}