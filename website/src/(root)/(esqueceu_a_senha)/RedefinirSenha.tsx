// RedefinirSenha.tsx

import React, { useState } from "react";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingSvg from "../../assets/icons/loading.svg"; // Verifique se o caminho do ícone de carregamento está correto

const RedefinirSenha = () => {
  const [senha, setSenha] = useState(""); // Usar 'senha' como o campo para a nova senha
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const clienteId = localStorage.getItem("clienteId"); // Recupera o ID do cliente do localStorage
    if (!clienteId) {
      alert("ID do cliente não encontrado. Tente novamente.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("Senhas não coincidem.");
      return;
    }

    console.log("Chamando a API de redefinir-senha com:", {
      id: clienteId,
      senha,
    });

    setLoading(true); // Inicia o carregamento

    try {
      const response = await axios.put(
        `http://localhost:5000/api/clientes/redefinir-senha/${clienteId}`, // Inclui o ID do cliente na URL
        { senha } // Envia a nova senha no corpo da requisição
      );
      console.log("Resposta do servidor:", response.data);
      navigate("/confirmacao");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };
  const handleClickLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <header className="bg-white w-full shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-start">
        <div className="flex items-center gap-2 cursor-pointer"
        onClick={handleClickLanding}>
          <Logo className="h-8" />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
            Madri Imobiliária
          </span>
        </div>
      </header>

      <div className="flex-grow flex justify-center items-center w-full">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center md:bg-white md:rounded-lg md:shadow-lg">
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Redefinir Senha
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Insira e confirme sua nova senha.
          </p>

          <form
            className="w-full space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="senha"
              >
                Nova Senha
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite a nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="confirmarSenha"
              >
                Confirmar Senha
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme a nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full mb-4"
              type="submit"
              disabled={loading} // Desabilita o botão enquanto carrega
            >
              {loading ? (
                <img
                  src={loadingSvg}
                  alt="Carregando..."
                  className="inline-block w-5 h-5"
                />
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RedefinirSenha;
