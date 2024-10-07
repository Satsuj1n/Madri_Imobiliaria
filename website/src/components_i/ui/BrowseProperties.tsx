import React, { useState } from "react";
import { Button } from "./Button";
import { ReactComponent as CalendarIcon } from "../../assets/icons/Calendar.svg";

const BrowseProperties = () => {
  const [selectedOption, setSelectedOption] = useState("Alugar");
  const options = ["Alugar", "Comprar", "Vender"];

  return (
    <div className="flex flex-col items-center md:items-start relative z-10">
      {/* Opções para Alugar, Comprar e Vender */}
      <div className="bg-white p-3 rounded-t-lg shadow-md w-full md:w-[420px] flex justify-center md:justify-start items-center border-b border-gray-200">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`cursor-pointer mx-4 md:mx-8 text-base md:text-lg font-medium ${
              selectedOption === option ? "text-[#0053f8]" : "text-gray-600"
            }`}
          >
            {option}
            {selectedOption === option && (
              <div className="h-1 mt-1 bg-[#0053f8]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Div para desktop */}
      <div className="hidden md:flex bg-white p-6 rounded-b-lg shadow-md w-full md:w-[980px]">
        <div className="flex w-full justify-between items-center space-x-6">
          {/* Bloco de Localização */}
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-gray-500 text-[18px]">Localização</p>
              <p className="font-bold text-[20px] text-black">Brasil, Teresina</p>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-l border-gray-300 h-12"></div>

          {/* Bloco de Data */}
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-gray-500 text-[18px]">Quando</p>
              <p className="font-bold text-[20px] text-black flex items-center">
                Selecione a Data
                <CalendarIcon className="ml-2" />
              </p>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-l border-gray-300 h-12"></div>

          {/* Botão para Buscar Propriedades */}
          <Button variant="large" size="large">
            Buscar Propriedades
          </Button>
        </div>
      </div>

      {/* Versão mobile compacta */}
      <div className="flex md:hidden flex-col items-start bg-white p-4 rounded-lg shadow-md w-full">
        <input
          type="text"
          placeholder="Localização"
          className="mb-4 p-2 border rounded-md w-full"
        />
        <input
          type="date"
          placeholder="Quando"
          className="mb-4 p-2 border rounded-md w-full"
        />
        <Button variant="default" size="md" className="w-full">
          Buscar Propriedades
        </Button>
      </div>
    </div>
  );
};

export default BrowseProperties;
