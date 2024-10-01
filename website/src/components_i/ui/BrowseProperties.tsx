import React, { useState } from "react";
import { Button } from "./Button";
import { ReactComponent as CalendarIcon } from "../../assets/icons/Calendar.svg"; // Certifique-se de que este caminho esteja correto

const BrowseProperties = () => {
  const [selectedOption, setSelectedOption] = useState("Alugar");

  const options = ["Alugar", "Comprar", "Vender"];

  return (
    <div className="flex flex-col items-left relative z-30">
      {/* Div compacta para Alugar, Comprar, Vender */}
      <div className="bg-white p-3 rounded-t-lg shadow-md w-[420px] flex justify-left items-center border-b border-gray-200">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`cursor-pointer mx-8 text-lg font-medium ${
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

      {/* Div maior separada para os campos de localização, data e botão */}
      <div className="bg-white p-6 rounded-b-lg shadow-md w-[980px]">
        <div className="flex justify-between items-center">
          {/* Primeiro bloco com localização */}
          <div className="flex items-start space-x-12">
            <div className="ml-4">
              <p className="text-gray-500 text-[18px]">Localização</p>
              <p className="font-bold text-[20px] text-black mr-6">
                Brasil, Teresina
              </p>
            </div>
            <div className="border-l border-gray-300 h-12 my-auto mx-4"></div>
          </div>

          {/* Segundo bloco com a data de mudança */}
          <div className="flex items-start space-x-12">
            <div>
              <p className="text-gray-500 text-[18px]">Quando</p>
              <p className="font-bold text-[20px] text-black flex items-center mr-4">
                Selecione a Data
                <CalendarIcon className="ml-2 mr-3" />
              </p>
            </div>
            <div className="border-l border-gray-300 h-12 my-auto mx-4"></div>
          </div>

          {/* Botão Default para Browse Properties */}
          <div className="mr-12">
            <Button variant="large" size="large">
              Buscar Propriedades
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
