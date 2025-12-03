import React, { useState, useEffect } from "react";
import { auth, db } from "../../Api";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [tipoUsuario] = useState("usuario");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Marca campo como "tocado"
  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const e = {};

    if (!nome.trim()) e.nome = "Nome é obrigatório.";

    if (!email.trim()) e.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Email inválido.";

    if (!senha) e.senha = "Senha é obrigatória.";
    else if (senha.length < 8)
      e.senha = "A senha precisa ter pelo menos 8 caracteres.";

    if (!confirmSenha) e.confirmSenha = "Confirme sua senha.";
    else if (confirmSenha !== senha)
      e.confirmSenha = "As senhas não coincidem.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Valida em tempo real
  useEffect(() => {
    setIsValid(validate());
  }, [nome, email, senha, confirmSenha]);

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Marca todos como tocados ao tentar enviar
    setTouched({
      nome: true,
      email: true,
      senha: true,
      confirmSenha: true,
    });

    if (!validate()) return;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const user = cred.user;

      await updateProfile(user, { displayName: nome });

      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        tipoUsuario,
        criadoEm: new Date().toISOString(),
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <h1 className="title">Ecolink</h1>
        <h2 className="subtitle">Crie sua conta 🌍</h2>

        <form onSubmit={handleCadastro}>

          <div className={`input-group ${errors.nome && touched.nome ? "error" : ""}`}>
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onInput={() => markTouched("nome")}
            />
            {errors.nome && touched.nome && <small className="error">{errors.nome}</small>}
          </div>

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

          <button className="btn" type="submit" disabled={!isValid}>
            Cadastrar
          </button>

          <p className="redirect">
            Já tem conta?
            <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Entre aqui
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}
