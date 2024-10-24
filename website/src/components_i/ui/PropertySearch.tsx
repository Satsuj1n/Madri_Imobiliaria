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
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [localizacao, setLocalizacao] = useState("");
  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(5000);
  const [categoria, setCategoria] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Estado para controlar o modal de filtros

  // Função para enviar os filtros ao componente pai
  const handleSearch = () => {
    onSearch({
      localizacao,
      precoMinimo,
      precoMaximo,
      categoria,
    });
  };

  // Função para abrir o modal de filtros
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
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
          <Button variant="outline" size="large2" onClick={toggleFilters}>
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>

            {/* Bloco de Data de Entrada */}
            <div className="mb-4">
              <label className="text-gray-600">Data de Entrada</label>
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>

            {/* Bloco de Data de Saída */}
            <div className="mb-4">
              <label className="text-gray-600">Data de Saída</label>
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>

            {/* Slider Preço Mínimo */}
            <div className="mb-4">
              <label className="text-gray-600">
                Preço Mínimo: R$ {precoMinimo}
              </label>
              <input
                type="range"
                min="0"
                max="50000"
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
              <label className="text-gray-600">
                Preço Máximo: R$ {precoMaximo}
              </label>
              <input
                type="range"
                min="0"
                max="50000"
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

            {/* Dropdown de Categorias */}
            <div className="mb-4">
              <label className="text-gray-600">Categoria</label>
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

            <div className="flex justify-center space-x-2 mt-4">
              <Button variant="default" onClick={toggleFilters}>
                Fechar
              </Button>
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
