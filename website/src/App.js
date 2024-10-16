import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./(root)/(home)/page"; // Ajuste o caminho conforme necessário
import LoginPage from "./(root)/(login)/Login"; // Ajuste o caminho conforme necessário
import RegisterPage from "./(root)/(signup)/Register"; // Ajuste o caminho conforme necessário
import ProfilePage from "./(root)/(profile)/Profile"; // Ajuste o caminho conforme necessário
import ChangePasswordPage from "./(root)/(trocar-senha)/TrocarSenha"; // Ajuste o caminho conforme necessário
import CriarImovel1 from "./(root)/(criar-imovel)/CriarImovel1"; // Página 1 para criar imóvel
import CriarImovel2 from "./(root)/(criar-imovel)/CriarImovel2"; // Página 2 para criar imóvel

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Página inicial */}
        <Route path="/login" element={<LoginPage />} /> {/* Página de login */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Página de registro */}
        <Route path="/profile" element={<ProfilePage />} />{" "}
        {/* Página de perfil */}
        <Route path="/alterar-senha" element={<ChangePasswordPage />} />{" "}
        {/* Página de troca de senha */}
        <Route path="/criar-imovel/1" element={<CriarImovel1 />} />{" "}
        {/* Parte 1 - Criar Imóvel */}
        <Route path="/criar-imovel/2" element={<CriarImovel2 />} />{" "}
        {/* Parte 2 - Criar Imóvel */}
      </Routes>
    </Router>
  );
}

export default App;
