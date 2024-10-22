import React, { useEffect, useState, FC } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard"; // Importando o componente HouseCard
import loadingIcon from "../../assets/icons/loading.svg"; // Caminho para o loading.svg

interface Imovel {
  _id: string;
  tipo: string;
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
      // Filtra sempre pelo preço
      const withinPriceRange =
        filters.faixaPreco === "R$0–R$2,500"
          ? imovel.aluguelValor >= 0 && imovel.aluguelValor <= 2500
          : filters.faixaPreco === "R$2,500–R$5,000"
          ? imovel.aluguelValor > 2500 && imovel.aluguelValor <= 5000
          : filters.faixaPreco === "R$5,000+"
          ? imovel.aluguelValor > 5000
          : true; // Considera todos se não houver faixa de preço especificada

      console.log(
        `Imóvel: ${imovel.titulo}, Valor: ${imovel.aluguelValor}, Passou no filtro de preço?`,
        withinPriceRange
      );

      // Filtra pela localização usando includes e ignorando maiúsculas/minúsculas
      const matchesLocation = filters.localizacao
        ? imovel.cidadeEstado
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase()) ||
          imovel.endereco
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase())
        : true;

      console.log(
        `Imóvel: ${imovel.titulo}, CidadeEstado: ${imovel.cidadeEstado}, Passou no filtro de localização?`,
        matchesLocation
      );

      // Filtra pela categoria de propriedade apenas se o campo for preenchido
      const matchesCategory = filters.categoria
        ? imovel.categoria.toLowerCase() === filters.categoria.toLowerCase()
        : true; // Se for vazio ou undefined, passa todos os imóveis

      console.log(
        `Imóvel: ${imovel.titulo}, Categoria: ${imovel.categoria}, Passou no filtro de categoria?`,
        matchesCategory
      );

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

      console.log(
        `Imóvel: ${imovel.titulo}, Data de Entrada: ${filters.dataEntrada}, Data de Saída: ${filters.dataSaida}, Passou no filtro de data?`,
        matchesDate
      );

      // Retorna apenas os imóveis que passam em todos os filtros
      return (
        withinPriceRange && matchesLocation && matchesCategory && matchesDate
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

    // Se a categoria não estiver selecionada (valor vazio), considera que não foi aplicado o filtro de categoria
    const categoria = newFilters.tipoPropriedade || "";

    setFilters({ ...newFilters, categoria });
    const filtrados = applyFilters(imoveis, { ...newFilters, categoria });
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
