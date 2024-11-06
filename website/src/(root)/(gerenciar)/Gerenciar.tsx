import React, { useEffect, useState } from "react";
import Navbar from "components_i/ui/Navbar";
import Footer from "components_i/ui/Footer";
import loadingIcon from "../../assets/icons/loading.svg";
import HouseCardHorizontal from "components_i/ui/HouseCardHorizontal";
import axios from "axios";
import { Button } from "components_i/ui/Button";
import { useNavigate } from "react-router-dom";

interface Imovel {
  _id: string;
  titulo: string;
  situacao?: string;
  endereco: string;
  cep: number;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria: string;
  IPTUAnual?: number;
  IPTUMensal?: number;
  aluguelValor?: number;
  valor?: number;
  areaExterna?: number;
  areaInterna?: number;
  imagemPrincipal: string;
  dataDisponivelInicio?: Date;
  dataDisponivelFim?: Date;
  cliente: { email: string };
}

const Gerenciar: React.FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true); // Estado para verificar autenticação
  const [imovelToDelete, setImovelToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const getClienteData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token não encontrado. Redirecionando para login.");
      navigate("/login"); // Redireciona para login
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;
      console.log("ID do usuário decodificado do token:", userId);

      const response = await axios.get(
        `http://localhost:5000/api/clientes/${userId}`,
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );
      console.log("Dados do cliente carregados:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter os dados do cliente logado:", error);
      navigate("/login"); // Redireciona para login em caso de erro
      return null;
    }
  };

  const getAllImoveis = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/api/imoveis`, {
        headers: {
          Authorization:
            token && token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
      });
      console.log("Todos os imóveis carregados:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os imóveis:", error);
      return [];
    }
  };

  const getImoveisByClienteEmail = async (email: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/imoveis/cliente/${email}`,
        {
          headers: {
            Authorization:
              token && token.startsWith("Bearer ") ? token : `Bearer ${token}`,
          },
        }
      );
      console.log("Imóveis do cliente carregados:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar imóveis do cliente:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchImoveis = async () => {
      setLoadingAuth(true);

      const clienteData = await getClienteData();
      if (clienteData) {
        if (clienteData.isAdmin) {
          const todosImoveis = await getAllImoveis();
          setImoveis(todosImoveis);
        } else {
          const imoveisDoCliente = await getImoveisByClienteEmail(
            clienteData.email
          );
          setImoveis(imoveisDoCliente);
        }
      } else {
        console.log("Cliente não autenticado.");
        navigate("/login"); // Redireciona se o cliente não estiver autenticado
      }

      setLoading(false);
      setLoadingAuth(false);
    };

    fetchImoveis();
  }, [navigate]);

  const handleDeleteImovel = async (id: string) => {
    let token = localStorage.getItem("token");

    token = token && token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    if (!token) {
      alert("Você não está autenticado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        setImoveis((prevImoveis) =>
          prevImoveis.filter((imovel) => imovel._id !== id)
        );
        setImovelToDelete(null);
        alert("Imóvel deletado com sucesso!");
      } else if (response.status === 401) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Erro ao deletar imóvel. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
      alert("Erro ao deletar imóvel. Tente novamente.");
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={loadingIcon} alt="Loading" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Gerenciar Imóveis
          </h1>
          {loading ? (
            <div className="flex justify-center items-center">
              <img src={loadingIcon} alt="Loading" className="w-20 h-20" />
            </div>
          ) : imoveis.length > 0 ? (
            <div className="space-y-6">
              {imoveis.map((imovel) => (
                <HouseCardHorizontal
                  key={imovel._id}
                  id={imovel._id}
                  titulo={imovel.titulo}
                  situacao={imovel.situacao}
                  endereco={imovel.endereco}
                  cep={imovel.cep}
                  area={imovel.area}
                  quarto={imovel.quarto}
                  banheiro={imovel.banheiro}
                  tipo={imovel.tipo}
                  categoria={imovel.categoria}
                  IPTUAnual={imovel.IPTUAnual}
                  IPTUMensal={imovel.IPTUMensal}
                  valor={imovel.valor}
                  aluguelValor={imovel.aluguelValor}
                  areaExterna={imovel.areaExterna}
                  areaInterna={imovel.areaInterna}
                  imagemPrincipal={imovel.imagemPrincipal}
                  dataDisponivelInicio={imovel.dataDisponivelInicio}
                  dataDisponivelFim={imovel.dataDisponivelFim}
                  onDelete={() => setImovelToDelete(imovel._id)}
                />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-500 text-center mt-32">
                Você não tem nenhum imóvel cadastrado no momento.
              </p>
              <div className="flex justify-center mt-32">
                <Button
                  variant="extraLarge"
                  size="extraLarge"
                  onClick={() => navigate("/criar-imovel/1")}
                >
                  Criar Imóvel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {imovelToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <p className="text-lg font-semibold">Tem certeza?</p>
            <p className="text-sm text-gray-600 mt-2">
              Esta ação removerá o imóvel permanentemente e não poderá ser
              desfeita.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteImovel(imovelToDelete)}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setImovelToDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gerenciar;
