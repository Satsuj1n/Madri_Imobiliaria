import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../components_i/ui/Button";
import Navbar from "components_i/ui/Navbar";
import { useNavigate } from "react-router-dom";

interface Cliente {
  _id: string;
  nomeRazaoSocial: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
  relacionamento: string;
  isAdmin: boolean;
  dataCadastro: string;
}

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      // Carregar dados do cliente logado
      axios
        .get(`http://localhost:5000/api/clientes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const cliente: Cliente = res.data;
          setCliente(cliente); // Armazena os dados do cliente
        })
        .catch((err) => {
          console.error("Erro ao carregar dados do cliente:", err);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    if (formData.novaSenha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const updateData = {
        senhaAtual: formData.senhaAtual,
        novaSenha: formData.novaSenha,
      };

      console.log("Dados enviados para alteração de senha: ", updateData);

      // Atualize para a nova rota de alterar senha
      const response = await axios.put(
        `http://localhost:5000/api/clientes/${cliente?._id}/alterar-senha`, // Chamada para a nova rota
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resposta do servidor: ", response.data);
      setSucesso("Senha alterada com sucesso!");

      // Esperar 2 segundos antes de redirecionar para o perfil
      setTimeout(() => {
        navigate("/profile");
      }, 2000); // 2 segundos de atraso antes do redirecionamento
    } catch (err: any) {
      console.error("Erro ao alterar senha: ", err.response?.data || err);
      setErro(`${err.response?.data?.error || "Erro desconhecido"}`);
    }
  };

  const handleForgotPassword = () => {
    navigate("/esqueceu-senha"); // Redireciona para a página de recuperação de senha
  };

  const handleGoBack = () => {
    navigate("/profile"); // Redireciona para a página de perfil
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Mantém o Navbar com o nome do usuário logado */}
      <div className="container mx-auto p-4">
        {/* Botão de Voltar */}
        <div className="mt-[70px]">
          <button
            className="text-blue-500 hover:underline text-md"
            onClick={handleGoBack}
          >
            🠔 Voltar
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4  text-center">
          Alterar Senha
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          {erro && <p className="text-red-500">{erro}</p>}
          {sucesso && <p className="text-green-500">{sucesso}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="senhaAtual"
              >
                Senha Atual
              </label>
              <input
                id="senhaAtual"
                name="senhaAtual"
                type="password"
                value={formData.senhaAtual}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {/* Link "Esqueceu sua senha?" */}
              <div className="text-sm text-blue-500 hover:underline cursor-pointer mt-2">
                <span onClick={handleForgotPassword}>Esqueceu sua senha?</span>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="novaSenha"
              >
                Nova Senha
              </label>
              <input
                id="novaSenha"
                name="novaSenha"
                type="password"
                value={formData.novaSenha}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmarSenha"
              >
                Confirmar Nova Senha
              </label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Alterar Senha
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
