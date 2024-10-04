import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./(root)/(home)/page.tsx"; // Ajuste o caminho conforme necessário
import LoginPage from "./(root)/(login)/Login.tsx"; // Ajuste o caminho conforme necessário
import RegisterPage from "./(root)/(signup)/Register.tsx"; // Ajuste o caminho conforme necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Página inicial */}
        <Route path="/login" element={<LoginPage />} /> {/* Página de login */}
        <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
      </Routes>
    </Router>
  );
}

export default App;
