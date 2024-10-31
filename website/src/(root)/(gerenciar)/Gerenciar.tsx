import React, { useEffect, useState } from "react";
import Navbar from "components_i/ui/Navbar";
import Footer from "components_i/ui/Footer";
import loadingIcon from "../../assets/icons/loading.svg";
import HouseCardHorizontal from "components_i/ui/HouseCardHorizontal";

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
}

const Gerenciar: React.FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllImoveis = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/imoveis"); // URL da API para buscar os imóveis
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchImoveis = async () => {
      const todosImoveis = await getAllImoveis();
      setImoveis(todosImoveis);
      setLoading(false);
    };
    fetchImoveis();
  }, []);

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
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Nenhum imóvel cadastrado no momento.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gerenciar;
