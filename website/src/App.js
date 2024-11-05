import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./(root)/(home)/page";
import LoginPage from "./(root)/(login)/Login";
import RegisterPage from "./(root)/(signup)/Register";
import ProfilePage from "./(root)/(profile)/Profile";
import ChangePasswordPage from "./(root)/(trocar-senha)/TrocarSenha";
import CriarImovel1 from "./(root)/(criar-imovel)/CriarImovel1";
import CriarImovel2 from "./(root)/(criar-imovel)/CriarImovel2";
import CriarImovel3 from "./(root)/(criar-imovel)/CriarImovel3";
import ImoveisAluguel from "./(root)/(aluguel)/ImoveisAluguel";
import ImoveisVenda from "./(root)/(venda)/ImoveisVenda";
import Detalhes from "./(root)/(imovel)/Detalhes";
import Gerenciar from "./(root)/(gerenciar)/Gerenciar";
import EditarInfo from "./(root)/(gerenciar)/EditarInfo";
import EditarImagem from "./(root)/(gerenciar)/EditarImagem";
import EsqueciSenha from "./(root)/(esqueceu_a_senha)/EsqueciSenha";
import VerificarOtp from "./(root)/(esqueceu_a_senha)/VerificarOtp";
import RedefinirSenha from "./(root)/(esqueceu_a_senha)/RedefinirSenha";
import Confirmacao from "./(root)/(esqueceu_a_senha)/Confirmacao";
import { RecoveryProvider } from "./(root)/(esqueceu_a_senha)/RecoveryContext"; // Importando o RecoveryProvider

function App() {
  return (
    <Router>
      <RecoveryProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Página inicial */}
          <Route path="/login" element={<LoginPage />} /> {/* Página de login */}
          <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
          <Route path="/profile" element={<ProfilePage />} /> {/* Página de perfil */}
          <Route path="/alterar-senha" element={<ChangePasswordPage />} /> {/* Página de troca de senha */}
          <Route path="/criar-imovel/1" element={<CriarImovel1 />} /> {/* Parte 1 - Criar Imóvel */}
          <Route path="/criar-imovel/2" element={<CriarImovel2 />} /> {/* Parte 2 - Criar Imóvel */}
          <Route path="/criar-imovel/3" element={<CriarImovel3 />} /> {/* Parte 3 - Criar Imóvel */}
          <Route path="/aluguel" element={<ImoveisAluguel />} />
          <Route path="/venda" element={<ImoveisVenda />} />
          <Route path="/imovel/:id" element={<Detalhes />} />
          <Route path="/gerenciar" element={<Gerenciar />} />
          <Route path="/editar-info/:id" element={<EditarInfo />} />
          <Route path="/editar-imagem/:id" element={<EditarImagem />} />

          {/* Novas rotas para o fluxo de "Esqueceu a Senha" */}
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/verificar-otp" element={<VerificarOtp />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
        </Routes>
      </RecoveryProvider>
    </Router>
  );
}

export default App;
