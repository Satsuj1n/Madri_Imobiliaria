import React, { useEffect, useState, FC } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard"; // Importando o componente HouseCard
import loadingIcon from "../../assets/icons/loading.svg"; // Caminho para o loading.svg

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
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]); // Para armazenar imóveis filtrados
  const [filters, setFilters] = useState({
    localizacao: "",
    faixaPreco: "",
    tipoPropriedade: "",
  });

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

  // Função para aplicar os filtros
  const applyFilters = (imoveis: Imovel[], filters: any) => {
    return imoveis.filter((imovel) => {
      // Filtra sempre pelo preço
      const withinPriceRange =
        filters.faixaPreco === "R$0–R$2,500"
          ? imovel.aluguelValor >= 0 && imovel.aluguelValor <= 2500
          : filters.faixaPreco === "R$2,500–R$5,000"
          ? imovel.aluguelValor > 2500 && imovel.aluguelValor <= 5000
          : imovel.aluguelValor > 5000;

      // Filtra pela localização apenas se o campo foi preenchido
      const matchesLocation = filters.localizacao
        ? imovel.cidadeEstado
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase())
        : true; // Se não foi preenchido, passa todos os imóveis

      // Filtra pelo tipo de propriedade apenas se o campo foi preenchido
      const matchesPropertyType = filters.tipoPropriedade
        ? imovel.tipo.toLowerCase() === filters.tipoPropriedade.toLowerCase()
        : true; // Se não foi preenchido, passa todos os imóveis

      // Retorna apenas os imóveis que passam em todos os filtros
      return withinPriceRange && matchesLocation && matchesPropertyType;
    });
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
      setFilteredImoveis(imoveisAluguel); // Inicializa imóveis filtrados
      setLoading(false); // Finaliza o carregamento
    };

    fetchImoveis(); // Chamar a função de busca
  }, []);

  // Função chamada quando o usuário realiza a busca com os filtros
  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
    const filtrados = applyFilters(imoveis, newFilters);
    setFilteredImoveis(filtrados);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mt-24">
            Imóveis para Aluguel
          </h1>
          <div className="flex items-center justify-center">
            {/* Passa a função de handleSearch para o PropertySearch */}
            <PropertySearch onSearch={handleSearch} />
          </div>

          {/* Lista de imóveis de aluguel */}
          <div className="container mx-auto py-8">
            {loading ? (
              // Exibe o ícone de carregamento enquanto os dados estão sendo buscados
              <div className="flex justify-center items-center">
                <img src={loadingIcon} alt="Loading" className="w-36 h-36" />
              </div>
            ) : filteredImoveis.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-12 mx-auto">
                {filteredImoveis.map((imovel) => (
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
                ))}
              </div>
            ) : (
              // Mensagem quando não há imóveis disponíveis
              <p className="text-gray-500 text-center">
                Nenhum imóvel disponível para aluguel no momento.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImoveisAluguel;
