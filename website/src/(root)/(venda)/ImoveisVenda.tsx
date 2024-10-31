import React, { useEffect, useState, FC } from "react";
import { useLocation } from "react-router-dom";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import HouseCard from "components_i/ui/HouseCard";
import loadingIcon from "../../assets/icons/loading.svg";
import MapComponent from "components_i/ui/MapComponent";

interface Imovel {
  _id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  valor?: number;
  aluguelValor?: number;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  outrasImagens?: string[];
  categoria: string;
  cep?: string;
}

const ImoveisVenda: FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);
  
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    localizacao: "",
    precoMinimo: 0,
    precoMaximo: 10000000,
    categoria: "",
    quarto: 1,
    banheiro: 1,
  });

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

  const applyFilters = (imoveis: Imovel[], filters: any) => {
    console.log("Aplicando filtros:", filters);
  
    return imoveis.filter((imovel) => {
      const withinPriceRange =
        (!filters.precoMinimo ||
          (imovel.valor !== undefined && imovel.valor >= filters.precoMinimo)) &&
        (!filters.precoMaximo ||
          (imovel.valor !== undefined && imovel.valor <= filters.precoMaximo));
  
      const matchesLocation = filters.localizacao
        ? imovel.cidadeEstado
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase()) ||
          imovel.endereco
            .toLowerCase()
            .includes(filters.localizacao.toLowerCase())
        : true;
  
      const matchesCategory =
        filters.categoria.length === 0 ||
        filters.categoria.split(",").some((cat: string) =>
          imovel.categoria.toLowerCase().includes(cat.trim().toLowerCase())
        );

      const matchesRooms = filters.quarto !== undefined ? imovel.quarto >= filters.quarto : true;
      const matchesBathrooms = filters.banheiro !== undefined ? imovel.banheiro >= filters.banheiro : true;
  
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
    const params = new URLSearchParams(location.search);
    const localizacao = params.get("localizacao") || "";
    const categoria = params.get("categoria") || "";

    setFilters((prev) => ({
      ...prev,
      localizacao,
      categoria,
    }));
  }, [location.search]);

  useEffect(() => {
    const fetchImoveis = async () => {
      const todosImoveis = await getAllImoveis();
      const imoveisVenda = todosImoveis.filter(
        (imovel: Imovel) => imovel.tipo === "venda"
      );
      const filtrados = applyFilters(imoveisVenda, filters);
      
      setImoveis(imoveisVenda);
      setFilteredImoveis(filtrados);
      setLoading(false);
    };

    fetchImoveis();
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-[#e7ecfd] min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-3/5 w-full p-4 h-auto lg:h-screen overflow-y-auto scrollbar-hide">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mt-24 mb-8">
            Imóveis para Venda
          </h1>
          <div className="flex items-center justify-center">
            <PropertySearch onSearch={(newFilters) => setFilters(newFilters)} maxPrice={10000000} isVenda={true} />
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
                  <div key={imovel._id}>
                    <HouseCard
                      id={imovel._id}
                      aluguelValor={`R$ ${imovel.valor}`}
                      titulo={imovel.titulo}
                      bairro={imovel.bairro}
                      numero={imovel.numero}
                      endereco={imovel.endereco}
                      cidadeEstado={imovel.cidadeEstado}
                      quarto={imovel.quarto}
                      banheiro={imovel.banheiro}
                      area={imovel.area}
                      imagemPrincipal={imovel.imagemPrincipal}
                      outrasImagens={imovel.outrasImagens}
                      tipo={imovel.tipo}
                    />
                  </div>
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
