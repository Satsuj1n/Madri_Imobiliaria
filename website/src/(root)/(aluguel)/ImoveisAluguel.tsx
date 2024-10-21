import React, { useEffect, useState, FC } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard"; // Importando o componente HouseCard

interface Imovel {
  _id: string;
  titulo: string;
  descricao: string;
  aluguelValor: number;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  tipo: string;
}

const ImoveisAluguel: FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);

  // Função para buscar todos os imóveis
  const getAllImoveis = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/imoveis"); // Ajuste a URL se necessário
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      return [];
    }
  };

  useEffect(() => {
    // Carregar todos os imóveis ao montar o componente
    const fetchImoveis = async () => {
      const todosImoveis = await getAllImoveis();

      // Filtrar apenas os imóveis com o tipo 'aluguel'
      const imoveisAluguel = todosImoveis.filter(
        (imovel: Imovel) => imovel.tipo === "aluguel"
      );

      setImoveis(imoveisAluguel); // Atualiza o estado com os imóveis de aluguel
    };

    fetchImoveis(); // Chamar a função de busca
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen">
        <div className="container mx-auto p-4 ">
          {/* Adicionando espaçamento ao título */}
          <h1 className="text-2xl font-semibold text-gray-800 text-center mt-24">
            Imóveis para Aluguel
          </h1>
          <div className="flex items-center justify-center">
            <PropertySearch />
          </div>

          {/* Lista de imóveis de aluguel */}
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-12 mx-auto">
              {imoveis.length > 0 ? (
                imoveis.map((imovel) => (
                  <HouseCard
                    key={imovel._id}
                    aluguelValor={`R$ ${imovel.aluguelValor}`}
                    titulo={imovel.titulo}
                    bairro={imovel.bairro}
                    numero={imovel.numero}
                    endereco={imovel.endereco}
                    cidadeEstado={imovel.cidadeEstado}
                    quarto={imovel.quarto}
                    banheiro={imovel.banheiro}
                    area={imovel.area}
                    imagemPrincipal={imovel.imagemPrincipal}
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  Nenhum imóvel disponível para aluguel no momento.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImoveisAluguel;
