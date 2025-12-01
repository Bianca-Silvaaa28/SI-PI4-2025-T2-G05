import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Routes/Home";
import Coleta from "./components/Routes/Coleta";
import Dashboard from "./components/Routes/Dashboard";
import Guiadareciclagem from "./components/Routes/Guiadareciclagem";
import Sucesso from "./components/Routes/Sucesso";

function App() {
  return (
    <div className="min-h-screen bg-green-200">  
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coleta" element={<Coleta />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guia" element={<Guiadareciclagem />} />
          <Route path="/sucesso" element={<Sucesso />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
