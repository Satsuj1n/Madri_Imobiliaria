import React, { useState } from "react";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"; // Certifique-se de que o caminho esteja correto para seu SVG
import { Button } from "./Button";

const FilterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botão de Filtro */}
      <Button
        onClick={handleToggleModal}
        className="flex items-center space-x-2 bg-white border border-gray-300 p-2 rounded-lg"
      >
        <FilterIcon className="w-5 h-5" />
        <span>Filtros</span>
      </Button>

      {/* Modal de Filtros */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-lg p-6 relative">
            {/* Botão para fechar o modal */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={handleToggleModal}
            >
              &times;
            </button>

            {/* Conteúdo do filtro */}
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>

            {/* Bloco de Tipo de Acomodação */}
            <div className="mb-6">
              <p className="font-semibold">Tipo de Acomodação</p>
              <div className="flex space-x-4 mt-2">
                <button className="py-2 px-4 border rounded-lg">
                  Qualquer tipo
                </button>
                <button className="py-2 px-4 border rounded-lg">Quarto</button>
                <button className="py-2 px-4 border rounded-lg">
                  Espaço inteiro
                </button>
              </div>
            </div>

            {/* Bloco de Faixa de Preço */}
            <div className="mb-6">
              <p className="font-semibold">Faixa de Preço</p>
              <div className="flex items-center justify-between mt-2">
                <input type="range" min="0" max="1000" className="w-full" />
              </div>
              <div className="flex justify-between mt-2">
                <span>Mínimo: R$60</span>
                <span>Máximo: R$960+</span>
              </div>
            </div>

            {/* Bloco de Quartos e Camas */}
            <div className="mb-6">
              <p className="font-semibold">Quartos e Camas</p>
              <div className="flex space-x-4">
                <div>
                  <p>Quartos</p>
                  <button className="border rounded-full px-3 py-1">-</button>
                  <span className="mx-2">Qualquer</span>
                  <button className="border rounded-full px-3 py-1">+</button>
                </div>
                <div>
                  <p>Camas</p>
                  <button className="border rounded-full px-3 py-1">-</button>
                  <span className="mx-2">Qualquer</span>
                  <button className="border rounded-full px-3 py-1">+</button>
                </div>
              </div>
            </div>

            {/* Botão para remover filtros */}
            <div className="flex justify-between items-center">
              <button className="text-red-500">Remover filtros</button>
              <Button
                onClick={handleToggleModal}
                className="bg-black text-white px-6 py-2 rounded-lg"
              >
                Mostrar 1.000+ lugares
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
