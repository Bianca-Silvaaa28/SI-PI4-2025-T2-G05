import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const e = {};

    if (!email.trim()) e.email = "O campo de email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Inclua um email válido.";

    if (!senha.trim()) e.senha = "O campo de senha é obrigatório.";
    else if (senha.length < 8)
      e.senha = "A senha deve ter pelo menos 8 caracteres.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    setIsValid(validate());
  }, [email, senha]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // exibe os erros se clicar sem digitar
    setTouched({
      email: true,
      senha: true,
    });

    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Login não efetuado, revise os dados");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <h1 className="title">Ecolink</h1>
        <h2 className="subtitle">Bem-vindo 🌱</h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className={`input-group ${errors.email && touched.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={() => markTouched("email")}
            />
            {errors.email && touched.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Senha */}
          <div className={`input-group ${errors.senha && touched.senha ? "error" : ""}`}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onInput={() => markTouched("senha")}
            />
            {errors.senha && touched.senha && (
              <small className="error">{errors.senha}</small>
            )}
          </div>

          <button className="btn" type="submit" disabled={!isValid}>
            Entrar
          </button>

          <p className="redirect">
            Ainda não tem conta?
            <a onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
              Cadastre-se
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}
