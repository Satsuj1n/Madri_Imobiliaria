import React, { useEffect, useState, FC } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard"; // Importando o componente HouseCard
import loadingIcon from "../../assets/icons/loading.svg"; // Caminho para o loading.svg
import MapComponent from "components_i/ui/MapComponent";

interface Imovel {
  _id: string;
  tipo: string;
  cep: string;
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
  categoria: string; // Alterado para "categoria"
  dataInicioDisponivel?: string;
  dataFimDisponivel?: string;
}

const ImoveisAluguel: FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]); // Para armazenar imóveis filtrados

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState({
    localizacao: "",
    faixaPreco: "R$0–R$2,500",
    categoria: "", // Filtro para categoria
    dataMudanca: "", // Adiciona o filtro de data de mudança
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
    console.log("Aplicando filtros:", filters);

    return imoveis.filter((imovel) => {
      // Verifica se o imóvel está dentro do intervalo de preço definido
      const withinPriceRange =
        (!filters.precoMinimo || imovel.aluguelValor >= filters.precoMinimo) &&
        (!filters.precoMaximo || imovel.aluguelValor <= filters.precoMaximo);

      // Filtra pela localização usando includes e ignorando maiúsculas/minúsculas
      const matchesLocation = filters.localizacao
        ? imovel.cidadeEstado
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase()) ||
          imovel.endereco
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase())
        : true;

      // Filtra pela categoria de propriedade apenas se o campo for preenchido
      const matchesCategory = filters.categoria
        ? imovel.categoria.toLowerCase() === filters.categoria.toLowerCase()
        : true;

      // Filtra pelo número de quartos e banheiros
      const matchesRooms = imovel.quarto >= filters.quarto;
      const matchesBathrooms = imovel.banheiro >= filters.banheiro;

      // Corrigindo a lógica de comparação de datas de entrada e saída
      const matchesDate =
        filters.dataEntrada && filters.dataSaida
          ? imovel.dataInicioDisponivel && imovel.dataFimDisponivel
            ? new Date(filters.dataEntrada) >=
                new Date(imovel.dataInicioDisponivel.substring(0, 10)) &&
              new Date(filters.dataSaida) <=
                new Date(imovel.dataFimDisponivel.substring(0, 10))
            : true // Se os dados de disponibilidade estiverem indefinidos, considera que passa no filtro
          : true; // Se as datas não forem preenchidas, passa todos os imóveis

      return (
        withinPriceRange &&
        matchesLocation &&
        matchesCategory &&
        matchesRooms &&
        matchesBathrooms &&
        matchesDate
      );
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
    console.log("Filtros recebidos:", newFilters);

    // Atualiza os filtros recebidos, incluindo os quartos e banheiros
    const updatedFilters = {
      ...newFilters,
      categoria: newFilters.categoria || "", // Considera todas as categorias se não estiver selecionada
      quarto: newFilters.quarto || 1, // Valor mínimo para quarto
      banheiro: newFilters.banheiro || 1, // Valor mínimo para banheiro
    };

    setFilters(updatedFilters);

    // Aplica os filtros para a lista de imóveis
    const filtrados = applyFilters(imoveis, updatedFilters);
    setFilteredImoveis(filtrados);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen flex">
        {/* Lista de Imóveis */}
        <div className="w-3/5 p-4 h-screen overflow-y-auto scrollbar-hide">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mt-24">
            Imóveis para Aluguel
          </h1>
          <div className="flex items-center justify-center">
            <PropertySearch onSearch={handleSearch} />
          </div>
          <div className="container mx-auto py-8">
            {loading ? (
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
                    tipo={imovel.tipo}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Nenhum imóvel disponível para aluguel no momento.
              </p>
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="w-2/5 h-screen">
          <div className="w-full h-full relative">
            <MapComponent imoveis={filteredImoveis} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImoveisAluguel;
