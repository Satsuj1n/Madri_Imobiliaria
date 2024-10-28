import React, { useEffect, useState, FC } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard"; // Importando o componente HouseCard
import loadingIcon from "../../assets/icons/loading.svg"; // Caminho para o loading.svg
import MapComponent from "components_i/ui/MapComponent"; // Importando o MapComponent

// Tipo genérico para imóveis, cobrindo aluguel e venda
interface Imovel {
  _id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  valor?: number; // Usado para imóveis de venda
  aluguelValor?: number; // Usado para imóveis de aluguel
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  categoria: string;
  cep?: string; // Opcional para imóveis de venda
}

const ImoveisVenda: FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]); // Para armazenar imóveis filtrados

  // Filtros iniciais
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState({
    localizacao: "",
    precoMinimo: 0,
    precoMaximo: 10000000,
    categoria: "", // Filtro para categoria
    quarto: 1,
    banheiro: 1,
  });

  // Função para buscar todos os imóveis
  const getAllImoveis = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/imoveis");
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
      // Verifica se o imóvel está dentro do intervalo de preço definido
      const withinPriceRange =
        (!filters.precoMinimo ||
          (imovel.valor !== undefined &&
            imovel.valor >= filters.precoMinimo)) &&
        (!filters.precoMaximo ||
          (imovel.valor !== undefined && imovel.valor <= filters.precoMaximo));

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
      const matchesRooms = imovel.quarto >= (filters.quarto || 1);
      const matchesBathrooms = imovel.banheiro >= (filters.banheiro || 1);

      return (
        withinPriceRange &&
        matchesLocation &&
        matchesCategory &&
        matchesRooms &&
        matchesBathrooms
      );
    });
  };

  useEffect(() => {
    // Carregar todos os imóveis ao montar o componente
    const fetchImoveis = async () => {
      const todosImoveis = await getAllImoveis();

      // Filtrar apenas os imóveis com o tipo 'venda'
      const imoveisVenda = todosImoveis.filter(
        (imovel: Imovel) => imovel.tipo === "venda"
      );

      setImoveis(imoveisVenda); // Atualiza o estado com os imóveis de venda
      setFilteredImoveis(imoveisVenda); // Inicializa imóveis filtrados
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
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-3/5 w-full p-4 h-auto lg:h-screen overflow-y-auto scrollbar-hide">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mt-24 mb-8">
            Imóveis para Venda
          </h1>
          <div className="flex items-center justify-center">
            <PropertySearch onSearch={handleSearch} maxPrice={10000000} isVenda={true} />
          </div>

          <div className="container mx-auto py-8">
            {loading ? (
              <div className="flex justify-center items-center">
                <img src={loadingIcon} alt="Loading" className="w-36 h-36" />
              </div>
            ) : filteredImoveis.length > 0 ? (
              <div
                className="grid gap-10 mt-8 w-full max-w-[1120px] px-4 mb-12 mx-auto"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                {filteredImoveis.map((imovel) => (
                  <HouseCard
                    key={imovel._id}
                    aluguelValor={`R$ ${imovel.valor}`} // valor para venda
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
                Nenhum imóvel disponível para venda no momento.
              </p>
            )}
          </div>
        </div>

        <div className="lg:w-2/5 w-full h-96 lg:h-screen">
          <div className="w-full h-full relative">
            <MapComponent imoveis={filteredImoveis} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImoveisVenda;
