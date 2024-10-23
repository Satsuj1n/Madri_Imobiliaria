import React, { useState } from "react";
import { Button } from "./Button"; // Importa o seu componente Button
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"; // Substitua pelo caminho correto do seu ícone de filtro

interface PropertySearchProps {
  onSearch: (filters: any) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [localizacao, setLocalizacao] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Estado para controlar o modal de filtros

  // Função para enviar os filtros ao componente pai
  const handleSearch = () => {
    onSearch({
      localizacao,
    });
  };

  // Função para abrir o modal de filtros
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
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
          {" "}
          {/* Adicionei margin entre o botão de filtros e o de buscar */}
          <Button variant="outline" size="large2" onClick={toggleFilters}>
            <FilterIcon className="w-5 h-5 mr-2" />{" "}
            {/* Ícone com margem para a direita */}
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

            <div className="flex justify-end space-x-2">
              <Button variant="default" onClick={toggleFilters}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
