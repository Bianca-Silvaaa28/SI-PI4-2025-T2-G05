import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Routes/Home";
import Coleta from "./components/Routes/Coleta";
import Dashboard from "./components/Routes/Dashboard";
import Guiadareciclagem from "./components/Routes/Guiadareciclagem";
import Sucesso from "./components/Routes/Sucesso";
export default App;
import Login from "./components/Routes/Login";
import Cadastro from "./components/Routes/Cadastro";

function App() {
  return (
    <div className="min-h-screen bg-green-200">  
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/coleta" element={<Coleta />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guiadareciclagem" element={<Guiadareciclagem />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}




