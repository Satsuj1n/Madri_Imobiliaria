import React, { useEffect, useState } from "react";
import HouseCard from "./HouseCard";
import SegmentedControl from "./SegmentedControl";
import SearchBar from "./SearchBar";
import { Button } from "./Button";

interface Imovel {
  _id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  valor?: number;
  aluguelValor?: number;
  endereco: string;
  cep: string;
  numero: string;
  bairro: string;
  regiao: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  outrasImagens?: string[];
}

const PropertyListing = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);
  const [displayedImoveis, setDisplayedImoveis] = useState<Imovel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const itemsPerPage = 6;

  const fetchImoveis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/imoveis`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setImoveis(data);
        setFilteredImoveis(data);
        setDisplayedImoveis(data.slice(0, itemsPerPage));
      } else if (data.imoveis && Array.isArray(data.imoveis)) {
        setImoveis(data.imoveis);
        setFilteredImoveis(data.imoveis);
        setDisplayedImoveis(data.imoveis.slice(0, itemsPerPage));
      } else {
        setImoveis([]);
      }
    } catch (error) {
      setImoveis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedType, searchQuery]);

  const applyFilters = () => {
    let filtered = imoveis;

    if (selectedType === "Alugar") {
      filtered = filtered.filter((imovel) => imovel.aluguelValor);
    } else if (selectedType === "Comprar") {
      filtered = filtered.filter((imovel) => imovel.valor);
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((imovel) =>
        [
          imovel.titulo,
          imovel.descricao,
          imovel.endereco,
          imovel.cep,
          imovel.bairro,
          imovel.regiao,
        ]
          .join(" ")
          .toLowerCase()
          .includes(lowercasedQuery)
      );
    }

    setFilteredImoveis(filtered);
    setDisplayedImoveis(filtered.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const loadMoreImoveis = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const nextImoveis = filteredImoveis.slice(startIndex, endIndex);

    setDisplayedImoveis((prevDisplayed) => [...prevDisplayed, ...nextImoveis]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="text-center mt-8">
        <h2 className="text-[#000929] font-bold text-3xl md:text-5xl leading-tight">
          Propriedades Selecionadas para Você
        </h2>
        <p className="text-[#6C727F] mt-2 mb-6 md:mt-6 md:mb-16 text-sm md:text-base">
          Veja aqui todas as propriedades disponíveis 
        </p>
      </div>

      {/* Controles de Segmentação e Busca */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1120px] space-y-2 md:space-y-0 md:space-x-4 mt-4 mb-4">
        <div className="w-full md:w-auto md:mr-auto">
          <SegmentedControl
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
          />
        </div>
        <div className="w-full md:w-auto md:ml-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Listagem de Imóveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] mb-14">
        {loading ? (
          <p>Carregando imóveis...</p>
        ) : displayedImoveis.length > 0 ? (
          displayedImoveis.map((imovel) => (
            <HouseCard
              key={imovel._id}
              id={imovel._id}
              aluguelValor={
                imovel.aluguelValor
                  ? `R$${imovel.aluguelValor}`
                  : imovel.valor
                  ? `R$${imovel.valor}`
                  : ""
              }
              titulo={imovel.titulo}
              endereco={imovel.endereco}
              cidadeEstado={imovel.cidadeEstado}
              quarto={imovel.quarto}
              banheiro={imovel.banheiro}
              area={imovel.area}
              numero={imovel.numero}
              bairro={imovel.bairro}
              imagemPrincipal={imovel.imagemPrincipal}
              outrasImagens={imovel.outrasImagens}
              tipo={imovel.tipo}
            />
          ))
        ) : (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>

      {/* Botão de Carregar Mais */}
      <div className="mb-28">
        {currentPage * itemsPerPage < filteredImoveis.length && (
          <Button variant="large" size="large" onClick={loadMoreImoveis}>
            Ver Mais Propriedades
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
