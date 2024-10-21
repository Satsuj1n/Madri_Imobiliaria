import React, { useState } from "react";
import { Button } from "./Button";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/DownArrowIcon.svg"; // Substitua pelo seu ícone de seta para baixo

const PropertySearch = () => {
  const [localizacao, setLocalizacao] = useState("Nova York, EUA");
  const [dataMudanca, setDataMudanca] = useState("");
  const [faixaPreco, setFaixaPreco] = useState("$500–$2,500");
  const [tipoPropriedade, setTipoPropriedade] = useState("Casas");

  return (
    <div className="flex flex-col items-center md:items-start relative z-10 ">
      {/* Versão Desktop */}
      <div className="hidden md:flex bg-white p-6 rounded-lg shadow-md w-full md:w-[980px] justify-between items-center mt-24">
        {/* Bloco de Localização */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-gray-500 text-[16px]">Localização</p>
            <input
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="font-bold text-[18px] border-none outline-none"
              type="text"
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-12"></div>

        {/* Bloco de Data */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-gray-500 text-[16px]">Quando</p>
            <input
              value={dataMudanca}
              onChange={(e) => setDataMudanca(e.target.value)}
              className="font-bold text-[18px] border-none outline-none"
              type="date"
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-12"></div>

        {/* Bloco de Preço */}
        <div className="flex items-center space-x-4 relative">
          <div>
            <p className="text-gray-500 text-[16px]">Preço</p>
            <div className="relative">
              <select
                value={faixaPreco}
                onChange={(e) => setFaixaPreco(e.target.value)}
                className="font-bold text-[18px] border-none outline-none bg-white appearance-none p-2"
              >
                <option value="$500–$2,500">$500–$2,500</option>
                <option value="$2,500–$5,000">$2,500–$5,000</option>
                <option value="$5,000+">$5,000+</option>
              </select>
              {/* Ícone da seta para baixo */}
              <DownArrowIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-12"></div>

        {/* Bloco de Tipo de Propriedade */}
        <div className="flex items-center space-x-4 relative">
          <div>
            <p className="text-gray-500 text-[16px]">Tipo de Propriedade</p>
            <div className="relative">
              <select
                value={tipoPropriedade}
                onChange={(e) => setTipoPropriedade(e.target.value)}
                className="font-bold text-[18px] border-none outline-none bg-white appearance-none p-2"
              >
                <option value="Casas">Casas</option>
                <option value="Apartamentos">Apartamentos</option>
                <option value="Condomínios">Condomínios</option>
              </select>
              {/* Ícone da seta para baixo */}
              <DownArrowIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Botão de Busca */}
        <Button variant="large" size="large">
          Buscar
        </Button>
      </div>

      {/* Versão Mobile */}
      <div className="flex md:hidden flex-col items-start bg-white p-4 rounded-lg shadow-md w-full">
        <input
          type="text"
          placeholder="Localização"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />
        <input
          type="date"
          placeholder="Data de Mudança"
          value={dataMudanca}
          onChange={(e) => setDataMudanca(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />
        <div className="relative w-full mb-4">
          <select
            value={faixaPreco}
            onChange={(e) => setFaixaPreco(e.target.value)}
            className="p-6 border rounded-md w-full appearance-none"
          >
            <option value="$500–$2,500">$500–$2,500</option>
            <option value="$2,500–$5,000">$2,500–$5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
          {/* Ícone da seta para baixo no mobile */}
          <DownArrowIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
        <div className="relative w-full mb-4">
          <select
            value={tipoPropriedade}
            onChange={(e) => setTipoPropriedade(e.target.value)}
            className="p-6 border rounded-md w-full appearance-none"
          >
            <option value="Casas">Casas</option>
            <option value="Apartamentos">Apartamentos</option>
            <option value="Condomínios">Condomínios</option>
          </select>
          {/* Ícone da seta para baixo no mobile */}
          <DownArrowIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
        <Button variant="default" size="md" className="w-full">
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
