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

      console.log("Dados recebidos da API:", data);

      if (Array.isArray(data)) {
        setImoveis(data);
        setFilteredImoveis(data); // Inicializa com todos os imóveis
        setDisplayedImoveis(data.slice(0, itemsPerPage)); // Exibe os primeiros imóveis
      } else if (data.imoveis && Array.isArray(data.imoveis)) {
        setImoveis(data.imoveis);
        setFilteredImoveis(data.imoveis); // Inicializa com todos os imóveis
        setDisplayedImoveis(data.imoveis.slice(0, itemsPerPage)); // Exibe os primeiros imóveis
      } else {
        console.error("Formato inesperado da resposta da API:", data);
        setImoveis([]);
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
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
    <div className="flex flex-col items-center w-full">
      <div className="text-center mt-8">
        <h2
          className="text-[#000929] font-bold"
          style={{
            fontSize: "44px",
            lineHeight: "56px",
            letterSpacing: "-0.4px",
          }}
        >
          Propriedades Selecionas para Você
        </h2>
        <p
          className="text-[#6C727F] mt-2 mb-6 md:mt-6 md:mb-16"
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          Veja aqui todas as propriedades disponíveis 
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-[1120px] mt-4 px-4 mb-4 space-y-2 md:space-y-0">
        <SegmentedControl
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-14">
        {loading ? (
          <p>Carregando imóveis...</p>
        ) : displayedImoveis.length > 0 ? (
          displayedImoveis.map((imovel) => (
            <div key={imovel._id}>
              <HouseCard
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
            </div>
          ))
        ) : (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>

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
