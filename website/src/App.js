import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./(root)/(home)/page.tsx"; // Ajuste o caminho conforme necessário
import LoginPage from "./(root)/(login)/Login.tsx"; // Ajuste o caminho conforme necessário
import RegisterPage from "./(root)/(signup)/Register.tsx"; // Ajuste o caminho conforme necessário
import ProfilePage from "./(root)/(profile)/Profile.tsx"; // Ajuste o caminho conforme necessário
import ChangePasswordPage from "./(root)/(trocar-senha)/TrocarSenha.tsx"; // Ajuste o caminho conforme necessário
import AdicionarImovelPage from "./(root)/(criar-imovel)/criarImovel.tsx"; // Ajuste o caminho conforme necessário

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
        <Route path="/alterar-senha" element={<ChangePasswordPage />} />
        <Route path="/criar-imovel" element={<AdicionarImovelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
