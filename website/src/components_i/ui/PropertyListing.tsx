import React, { useEffect, useState } from "react";
import HouseCard from "./HouseCard";
import SegmentedControl from "./SegmentedControl";
import SearchBar from "./SearchBar";
import { Button } from "./Button";

interface Imovel {
  _id: string;
  tipo: string;
  titulo: string;
  valor?: number; // Para imóveis de venda
  aluguelValor?: number; // Para imóveis de aluguel
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
}

const PropertyListing = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Garante que imoveis é sempre um array
  const [displayedImoveis, setDisplayedImoveis] = useState<Imovel[]>([]); // Imóveis já exibidos
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 6; // Número de imóveis por página

  // Função para buscar todos os imóveis do banco de dados
  const fetchImoveis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/imoveis`);
      const data = await response.json();
      console.log("Dados recebidos da API:", data); // Log para verificar os dados recebidos

      if (Array.isArray(data)) {
        setImoveis(data); // Garante que os dados corretos são armazenados
        setDisplayedImoveis(data.slice(0, itemsPerPage)); // Exibe os primeiros imóveis
      } else if (data.imoveis && Array.isArray(data.imoveis)) {
        setImoveis(data.imoveis); // Corrige se o array de imóveis estiver aninhado
        setDisplayedImoveis(data.imoveis.slice(0, itemsPerPage)); // Exibe os primeiros imóveis
      } else {
        console.error("Formato inesperado da resposta da API:", data);
        setImoveis([]); // Define um array vazio se houver um erro inesperado
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      setImoveis([]); // Em caso de erro, define imoveis como um array vazio
    } finally {
      setLoading(false);
    }
  };

  // Carregar todos os imóveis ao montar o componente
  useEffect(() => {
    fetchImoveis();
  }, []);

  // Função para carregar mais imóveis conforme a página
  const loadMoreImoveis = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const nextImoveis = imoveis.slice(startIndex, endIndex); // Imóveis adicionais

    setDisplayedImoveis((prevDisplayed) => [...prevDisplayed, ...nextImoveis]); // Adiciona os novos imóveis aos já exibidos
    setCurrentPage((prevPage) => prevPage + 1); // Incrementa a página
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
          <SegmentedControl />
        </div>
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>

      {/* Propriedades carregadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-14">
        {loading ? (
          <p>Carregando imóveis...</p>
        ) : displayedImoveis.length > 0 ? (
          displayedImoveis.map((imovel) => (
            <HouseCard
              key={imovel._id}
              aluguelValor={
                imovel.aluguelValor
                  ? `R$${imovel.aluguelValor}`
                  : imovel.valor
                  ? `R$${imovel.valor}`
                  : ""
              } // Exibe o valor de aluguel ou venda, dependendo do que estiver disponível
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
        {currentPage * itemsPerPage < imoveis.length && (
          <Button variant="large" size="large" onClick={loadMoreImoveis}>
            Ver Mais Propriedades
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
