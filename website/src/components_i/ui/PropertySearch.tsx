import React, { useState } from "react";
import { Button } from "./Button";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/DownArrowIcon.svg"; // Substitua pelo seu ícone de seta para baixo

const PropertySearch = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [localizacao, setLocalizacao] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [faixaPreco, setFaixaPreco] = useState("R$0–R$2,500");
  const [tipoPropriedade, setTipoPropriedade] = useState("");

  // As categorias de propriedades conforme o seu banco de dados
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

  // Função para enviar os filtros ao componente pai
  const handleSearch = () => {
    onSearch({
      localizacao,
      dataEntrada,
      dataSaida,
      faixaPreco,
      tipoPropriedade,
    });
  };

  return (
    <div className="flex flex-col items-center md:items-start relative z-10">
      {/* Versão Desktop */}
      <div className="hidden md:flex bg-white p-4 rounded-lg shadow-md w-full md:w-[1100px] justify-between items-center mt-4">
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

        {/* Divisor */}
        <div className="border-l border-gray-300 h-10 mx-4"></div>

        {/* Bloco de Data de Entrada */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-gray-500 text-[14px] ml-1">Data de Entrada</p>
            <input
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              className="font-bold text-[16px] border-none outline-none"
              type="date"
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-10 mx-4"></div>

        {/* Bloco de Data de Saída */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-gray-500 text-[14px] ml-1">Data de Saída</p>
            <input
              value={dataSaida}
              onChange={(e) => setDataSaida(e.target.value)}
              className="font-bold text-[16px] border-none outline-none"
              type="date"
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-10 mx-4"></div>

        {/* Bloco de Preço */}
        <div className="flex items-center space-x-4 relative">
          <div>
            <p className="text-gray-500 text-[14px] ml-1">Preço</p>
            <div className="relative w-[160px]">
              <select
                value={faixaPreco}
                onChange={(e) => setFaixaPreco(e.target.value)}
                className="font-bold text-[16px] border-none outline-none bg-white appearance-none p-2 w-full ml-[-10px]"
              >
                <option value="R$0–R$2,500">R$0–R$2,500</option>
                <option value="R$2,500–R$5,000">R$2,500–R$5,000</option>
                <option value="R$5,000+">R$5,000+</option>
              </select>
              {/* Ícone da seta para baixo */}
              <DownArrowIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-l border-gray-300 h-10 mx-4"></div>

        {/* Bloco de Tipo de Propriedade */}
        <div className="flex items-center space-x-4 relative">
          <div>
            <p className="text-gray-500 text-[14px] ml-1">
              Tipo de Propriedade
            </p>
            <div className="relative w-[160px]">
              <select
                value={tipoPropriedade}
                onChange={(e) => setTipoPropriedade(e.target.value)}
                className="font-bold text-[16px] border-none outline-none bg-white appearance-none p-2 w-full"
              >
                <option value="">Todos</option>
                {/* Opção vazia para remover o filtro */}
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </select>
              {/* Ícone da seta para baixo */}
              <DownArrowIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Botão de Busca */}
        <div>
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
        <label className="mb-2 text-gray-500 text-[14px]">
          Data de Entrada
        </label>
        <input
          type="date"
          placeholder="Data de Entrada"
          value={dataEntrada}
          onChange={(e) => setDataEntrada(e.target.value)}
          className="mb-4 p-6 border rounded-md w-full"
        />
        <label className="mb-2 text-gray-500 text-[14px]">Data de Saída</label>
        <input
          type="date"
          placeholder="Data de Saída"
          value={dataSaida}
          onChange={(e) => setDataSaida(e.target.value)}
          className="mb-4 p-6 border rounded-md w-full"
        />
        <label className="mb-2 text-gray-500 text-[14px]">Preço</label>
        <div className="relative w-full mb-4">
          <select
            value={faixaPreco}
            onChange={(e) => setFaixaPreco(e.target.value)}
            className="p-6 border rounded-md w-full appearance-none"
          >
            <option value="R$0–R$2,500">R$0–R$2,500</option>
            <option value="R$2,500–R$5,000">R$2,500–R$5,000</option>
            <option value="R$5,000+">R$5,000+</option>
          </select>
          {/* Ícone da seta para baixo no mobile */}
          <DownArrowIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
        <label className="mb-2 text-gray-500 text-[14px]">
          Tipo de Propriedade
        </label>
        <div className="relative w-full mb-4">
          <select
            value={tipoPropriedade}
            onChange={(e) => setTipoPropriedade(e.target.value)}
            className="p-6 border rounded-md w-full appearance-none"
          >
            <option value="">Todas</option>
            {/* Opção vazia para remover o filtro */}
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </select>
          {/* Ícone da seta para baixo no mobile */}
          <DownArrowIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
        <Button
          variant="default"
          size="large"
          className="w-full"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
