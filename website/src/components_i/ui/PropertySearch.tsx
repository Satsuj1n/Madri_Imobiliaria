import React, { useState } from "react";
import { Button } from "./Button"; // Substitua pelo seu componente Button
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"; // Substitua pelo caminho correto do seu ícone de filtro

// Lista de categorias de imóveis
const categorias = [
  "andar corrido",
  "apartamento",
  "área privativa",
  "casa",
  "chácara",
  "cobertura",
  "fazenda",
  "flat",
  "galpão",
  "garagem",
  "kitnet",
  "loja",
  "lote",
  "lote em condomínio",
  "prédio",
  "sala",
  "salão",
  "sítio",
];

interface PropertySearchProps {
  onSearch: (filters: any) => void;
  maxPrice?: number; // Nova prop opcional para definir o preço máximo
  isVenda?: boolean; // Nova prop opcional para indicar se é venda
}

const PropertySearch: React.FC<PropertySearchProps> = ({
  onSearch,
  maxPrice = 500000,
  isVenda = false, // O padrão é false, ou seja, não é venda
}) => {
  const [localizacao, setLocalizacao] = useState("");
  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(maxPrice);
  const [categoria, setCategoria] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quarto, setQuarto] = useState<number | "Qualquer">("Qualquer");
  const [banheiro, setBanheiro] = useState<number | "Qualquer">("Qualquer");

  // Função para enviar os filtros ao componente pai e fechar o modal
  const handleSearch = () => {
    const appliedFilters = {
      localizacao,
      precoMinimo: precoMinimo || 0,
      precoMaximo: precoMaximo || maxPrice,
      categoria,
      quarto: quarto === "Qualquer" ? undefined : quarto,
      banheiro: banheiro === "Qualquer" ? undefined : banheiro,
    };

    onSearch(appliedFilters);
    setIsFilterOpen(false);
  };

  // Função para abrir o modal de filtros
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Função para remover todos os filtros
  const clearFilters = () => {
    setLocalizacao("");
    setPrecoMinimo(0);
    setPrecoMaximo(isVenda ? 10000000 : 500000);
    setCategoria("");
    setQuarto("Qualquer");
    setBanheiro("Qualquer");
  };

  // Função para incrementar o número de quartos
  const incrementQuarto = () => {
    if (quarto === "Qualquer") {
      setQuarto(1);
    } else {
      setQuarto((prevQuarto) =>
        typeof prevQuarto === "number" ? prevQuarto + 1 : 1
      );
    }
  };

  // Função para decrementar o número de quartos
  const decrementQuarto = () => {
    if (quarto === "Qualquer") {
      setQuarto(1);
    } else if (typeof quarto === "number" && quarto > 1) {
      setQuarto(quarto - 1);
    }
  };

  // Função para incrementar o número de banheiros
  const incrementBanheiro = () => {
    if (banheiro === "Qualquer") {
      setBanheiro(1);
    } else {
      setBanheiro((prevBanheiro) =>
        typeof prevBanheiro === "number" ? prevBanheiro + 1 : 1
      );
    }
  };

  // Função para decrementar o número de banheiros
  const decrementBanheiro = () => {
    if (banheiro === "Qualquer") {
      setBanheiro(1);
    } else if (typeof banheiro === "number" && banheiro > 1) {
      setBanheiro(banheiro - 1);
    }
  };

  // Lógica para impedir que o preço mínimo seja maior que o máximo
  const handleMinPriceChange = (value: number) => {
    if (value <= precoMaximo) {
      setPrecoMinimo(value);
    }
  };

  const handleMaxPriceChange = (value: number) => {
    if (value >= precoMinimo) {
      setPrecoMaximo(value);
    }
  };

  // Estilos inline para os sliders
  const sliderStyle: React.CSSProperties = {
    appearance: "none" as "none",
    width: "100%",
    height: "8px",
    background: "#d3d3d3",
    outline: "none",
    opacity: 0.7,
    transition: "opacity 0.2s",
  };

  const sliderThumbStyle: React.CSSProperties = {
    appearance: "none" as "none",
    width: "16px",
    height: "16px",
    background: "#0041c2",
    cursor: "pointer",
    borderRadius: "50%",
  };

  const sliderTrackStyle: React.CSSProperties = {
    background: "#d3d3d3",
  };

  return (
    <div className="flex flex-col items-center md:items-start relative z-10">
      {/* Versão Desktop */}
      <div className="hidden md:flex bg-white p-4 rounded-lg shadow-md w-full md:w-[550px] justify-between items-center mt-4">
        {/* Bloco de Localização */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-gray-500 text-[14px]">Localização</p>
            <input
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="font-bold text-[16px] border-none outline-none"
              type="text"
              placeholder="Digite a localização"
            />
          </div>
        </div>

        {/* Botão de Filtros */}
        <div className="ml-2">
          <Button variant="outlineblack" size="large2" onClick={toggleFilters}>
            <FilterIcon className="w-5 h-5 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Botão de Busca */}
        <div className="">
          <Button variant="large" size="large" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
      </div>

      {/* Versão Mobile */}
      <div className="flex md:hidden flex-col items-start bg-white p-4 rounded-lg shadow-md w-full mx-12 mt-4">
        <label className="mb-2 text-gray-500 text-[14px]">Localização</label>
        <input
          type="text"
          placeholder="Digite a Localização"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className="mb-4 p-6 border rounded-md w-full"
        />
        <Button
          variant="outlineblack"
          size="large"
          className="w-full mb-4"
          onClick={toggleFilters}
        >
          <FilterIcon className="w-5 h-5 mr-2" />
          Filtros
        </Button>

        <Button
          variant="default"
          size="large"
          className="w-full"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>

      {/* Modal de Filtros */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-xl shadow-lg relative ${
              isVenda ? "h-[70vh]" : "h-[80vh]"
            } w-[450px] ${isVenda ? "overflow-hidden" : "overflow-y-auto"}`}
          >
            {/* Navbar Filtros */}
            <div className="bg-white p-4 flex justify-between items-center shadow rounded-t-xl sticky top-0 z-10">
              <button
                className="text-blue-800 font-bold"
                onClick={toggleFilters}
              >
                ✕
              </button>
              <h2 className="text-lg font-bold text-center flex-1 ml-12">
                Filtros
              </h2>
              {/* Espaço reservado para alinhamento */}
              <div style={{ width: "64px" }}></div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[65vh]">
              {/* Exibir datas somente se não for venda */}
              {!isVenda && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Datas</h3>
                  {/* Bloco de Data de Entrada */}
                  <div className="mb-4">
                    <label className="font-semibold text-sm text-gray-600">
                      Data de Entrada
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  {/* Bloco de Data de Saída */}
                  <div className="mb-4">
                    <label className="font-semibold text-sm text-gray-600">
                      Data de Saída
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  {/* Divisor */}
                  <hr className="my-4" />
                </>
              )}

              <h3 className="text-lg font-semibold mb-2">Preços</h3>

              {/* Slider Preço Mínimo */}
              <div className="mb-4">
                <label className="font-semibold text-sm text-gray-600">
                  Preço Mínimo: R$ {precoMinimo}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={precoMinimo}
                  onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                  style={{ ...sliderStyle, ...sliderTrackStyle }}
                />
                <style>
                  {`
                  input[type="range"]::-webkit-slider-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                  input[type="range"]::-moz-range-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                  input[type="range"]::-ms-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                `}
                </style>
              </div>

              {/* Slider Preço Máximo */}
              <div className="mb-4">
                <label className="font-semibold text-sm text-gray-600">
                  Preço Máximo: R$ {precoMaximo}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={precoMaximo}
                  onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                  style={{ ...sliderStyle, ...sliderTrackStyle }}
                />
                <style>
                  {`
                  input[type="range"]::-webkit-slider-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                  input[type="range"]::-moz-range-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                  input[type="range"]::-ms-thumb {
                    ${Object.entries(sliderThumbStyle)
                      .map(([key, value]) => `${key}: ${value};`)
                      .join(" ")}
                  }
                `}
                </style>
              </div>

              {/* Divisor */}
              <hr className="my-4" />
              <h3 className="text-lg font-semibold mb-2">
                Quartos e Banheiros
              </h3>

              {/* Bloco de Quartos */}
              <div className="mb-4">
                <p className="font-semibold text-sm text-gray-600 mb-2">
                  Quartos
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    className="border rounded-full px-3 py-1"
                    onClick={decrementQuarto}
                  >
                    -
                  </button>
                  <span>
                    {quarto === "Qualquer" ? "Qualquer" : `${quarto}+`}
                  </span>
                  <button
                    className="border rounded-full px-3 py-1"
                    onClick={incrementQuarto}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bloco de Banheiros */}
              <div className="mb-4">
                <p className="font-semibold text-sm text-gray-600 mb-2">
                  Banheiros
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    className="border rounded-full px-3 py-1"
                    onClick={decrementBanheiro}
                  >
                    -
                  </button>
                  <span>
                    {banheiro === "Qualquer" ? "Qualquer" : `${banheiro}+`}
                  </span>
                  <button
                    className="border rounded-full px-3 py-1"
                    onClick={incrementBanheiro}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Divisor */}
              <hr className="my-4" />

              {/* Dropdown de Categorias */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Categoria</h3>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="bg-white p-4 flex justify-between items-center border-t rounded-b-xl sticky bottom-0 z-10">
              <button
                onClick={clearFilters}
                className="text-gray-600 bg-white border-none"
                style={{ cursor: "pointer" }}
              >
                Remover filtros
              </button>
              <Button variant="default" onClick={handleSearch}>
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
