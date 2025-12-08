import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import React, { useState, useEffect } from "react"; // importação para lidar com o estado de autenticação
import { onAuthStateChanged } from "firebase/auth"; // importação o listener de autenticação
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Routes/Home";
import Coleta from "./components/Routes/Coleta";
import Dashboard from "./components/Routes/Dashboard";
import Guiadareciclagem from "./components/Routes/Guiadareciclagem";
import Sucesso from "./components/Routes/Sucesso";
import Login from "./components/Routes/Login";
import Cadastro from "./components/Routes/Cadastro";
import { auth } from "./api"; // importação da instância de autenticação do Firebase

// Componente Wrapper para Rotas Protegidas
const ProtectedRoute = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined); // undefined indica estado inicial
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listener que monitora o estado de autenticação do Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        // Exibe tela de carregamento enquanto verifica o token
        return <div className="p-6 text-xl text-center">Verificando Autenticação...</div>;
    }

    // Se o usuário não estiver autenticado, redireciona para a tela de Login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <div className="min-h-screen bg-green-200">  
            <BrowserRouter>
                <Navbar />

                <Routes>
                    {/* Rota Inicial (Abre a tela de Login ou Cadastro) */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    
                    {/* Rotas Públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/guiadareciclagem" element={<Guiadareciclagem />} />
                    <Route path="/sucesso" element={<Sucesso />} />

                    {/* Rotas Protegidas (Exigem Login) */}
                    <Route 
                        path="/home" 
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/coleta" 
                        element={
                            <ProtectedRoute>
                                <Coleta />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;