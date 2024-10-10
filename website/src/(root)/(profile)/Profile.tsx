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

const ProfilePage = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nomeRazaoSocial: "",
    telefone: "",
    relacionamento: "",
    cpfCnpj: "",
    email: "",
    isAdmin: false,
    dataCadastro: "",
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
          const cliente = res.data;
          setCliente(cliente);
          setFormData({
            nomeRazaoSocial: cliente.nomeRazaoSocial,
            telefone: cliente.telefone,
            relacionamento: cliente.relacionamento,
            cpfCnpj: cliente.cpfCnpj,
            email: cliente.email,
            isAdmin: cliente.isAdmin,
            dataCadastro: cliente.dataCadastro,
          });
        })
        .catch((err) =>
          console.error("Erro ao carregar dados do cliente:", err)
        );
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const token = localStorage.getItem("token");

    try {
      // Certifique-se de enviar todos os campos como no curl que funcionou
      const updateData = {
        _id: cliente?._id,
        nomeRazaoSocial: formData.nomeRazaoSocial,
        telefone: formData.telefone,
        relacionamento: formData.relacionamento,
        cpfCnpj: formData.cpfCnpj, // CPF do cliente
        email: formData.email, // Email do cliente
        dataCadastro: formData.dataCadastro, // Data de cadastro
        isAdmin: formData.isAdmin, // Status de admin
      };

      console.log("Dados enviados para atualização: ", updateData);

      const response = await axios.put(
        `http://localhost:5000/api/clientes/${cliente?._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resposta do servidor: ", response.data);
      setSucesso("Perfil atualizado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao atualizar perfil: ", err.response?.data || err);
      setErro(
        `Erro ao atualizar perfil. Detalhes: ${
          err.response?.data?.error || "Erro desconhecido"
        }`
      );
    }
  };

  const handleChangePassword = () => {
    navigate("/"); // Redireciona para a página inicial por enquanto
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Mantém o Navbar com o nome do usuário logado */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-20">
          Configurações
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Informações Pessoais
          </h2>
          {erro && <p className="text-red-500">{erro}</p>}
          {sucesso && <p className="text-green-500">{sucesso}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nomeRazaoSocial"
              >
                Nome
              </label>
              <input
                id="nomeRazaoSocial"
                name="nomeRazaoSocial"
                type="text"
                value={formData.nomeRazaoSocial}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefone"
              >
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="text"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="relacionamento"
              >
                Relacionamento
              </label>
              <select
                id="relacionamento"
                name="relacionamento"
                value={formData.relacionamento}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Selecione</option>
                <option value="locador">Locador</option>
                <option value="locatário">Locatário</option>
                <option value="proprietário">Proprietário</option>
                <option value="fiador">Fiador</option>
              </select>
            </div>
            {/* Botão de Trocar Senha */}
            <Button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
              onClick={handleChangePassword}
            >
              Trocar Senha
            </Button>
            {/* Botão de Salvar Alterações */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Salvar Alterações
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
