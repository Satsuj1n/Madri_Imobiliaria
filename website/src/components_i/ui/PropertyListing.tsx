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
  valor?: number; // Para imóveis de venda
  aluguelValor?: number; // Para imóveis de aluguel
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
}

const PropertyListing = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Todos os imóveis carregados da API
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]); // Imóveis filtrados com base nos critérios
  const [displayedImoveis, setDisplayedImoveis] = useState<Imovel[]>([]); // Imóveis atualmente exibidos
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Para a busca geral
  const [selectedType, setSelectedType] = useState<string | null>(null); // Para o filtro de tipo de imóvel
  const itemsPerPage = 6; // Número de imóveis por página

  // Função para buscar todos os imóveis do banco de dados
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

  // Aplica os filtros automaticamente ao mudar tipo ou localização
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, searchQuery]); // Reage a mudanças no tipo ou na busca

  // Função para aplicar os filtros de tipo de imóvel e busca
  const applyFilters = () => {
    let filtered = imoveis;

    // Filtro por tipo de imóvel
    if (selectedType === "Alugar") {
      filtered = filtered.filter((imovel) => imovel.aluguelValor);
    } else if (selectedType === "Comprar") {
      filtered = filtered.filter((imovel) => imovel.valor);
    }

    // Filtro por busca geral (título, descrição, endereço, cep, bairro, regiao)
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
    setDisplayedImoveis(filtered.slice(0, itemsPerPage)); // Reseta a exibição inicial após aplicar os filtros
    setCurrentPage(1); // Reseta a página para a primeira
  };

  // Atualiza o tipo de imóvel ao clicar no SegmentedControl
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
  };

  // Atualiza a busca geral
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Função para carregar mais imóveis conforme a página, sem duplicar
  const loadMoreImoveis = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const nextImoveis = filteredImoveis.slice(startIndex, endIndex); // Pega mais imóveis filtrados

    setDisplayedImoveis((prevDisplayed) => [...prevDisplayed, ...nextImoveis]); // Adiciona novos imóveis
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Título e subtítulo */}
      <div className="text-center mt-8">
        <h2
          className="text-[#000929] font-bold"
          style={{
            fontSize: "48px",
            lineHeight: "56px",
            letterSpacing: "-0.4px",
          }}
        >
          Baseado na sua localização
        </h2>
        <p
          className="text-[#6C727F] mt-2 mb-6 md:mt-6 md:mb-16"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Algumas das nossas propriedades selecionadas perto de você.
        </p>
      </div>

      {/* Barra de controle e busca */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[1120px] mt-4 px-4 mb-4 space-y-2 md:space-y-0">
        <div className="w-full md:w-auto">
          <SegmentedControl
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
          />
        </div>
        <div className="w-full md:w-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Propriedades carregadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-14">
        {loading ? (
          <p>Carregando imóveis...</p>
        ) : displayedImoveis.length > 0 ? (
          displayedImoveis.map((imovel) => (
            <HouseCard
              id={imovel._id}
              key={imovel._id}
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
              tipo={imovel.tipo}
            />
          ))
        ) : (
          <p>Nenhum imóvel encontrado.</p>
        )}
      </div>

      {/* Botão de "Ver Mais Propriedades" */}
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
