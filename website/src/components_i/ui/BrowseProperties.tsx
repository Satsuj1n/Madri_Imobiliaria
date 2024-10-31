import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ReactComponent as ArrowIcon } from "../../assets/icons/DownArrowIcon.svg";
import { Checkbox } from "./Checkbox";

const categories = [
  "Todos os tipos",
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

const BrowseProperties = () => {
  const [selectedOption, setSelectedOption] = useState("Alugar");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const capitalize = (text: string) => {
    return text
      .toLowerCase() // Transforma tudo para minúsculas para evitar letras aleatórias maiúsculas
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toggleCategory = (category: string) => {
    if (category === "Todos os tipos") {
      if (selectedCategories.includes("Todos os tipos")) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories);
      }
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((c) => c !== category)
          : [...prevSelected, category]
      );
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (location) query.append("localizacao", location);
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes("Todos os tipos")
    ) {
      query.append("categoria", selectedCategories.join(",")); // Passar como string com vírgulas
    }
  
    // Redirecionamento com os parâmetros de filtro aplicados
    if (selectedOption === "Alugar") {
      navigate(`/aluguel?${query.toString()}`);
    } else if (selectedOption === "Comprar") {
      navigate(`/venda?${query.toString()}`);
    }
  };

  // Função para definir o texto do botão de categoria
  const getCategoryText = () => {
    if (selectedCategories.length === 0 || selectedCategories.includes("Todos os tipos")) {
      return "Selecionar Tipo";
    } else if (selectedCategories.length === 1) {
      return capitalize(selectedCategories[0]);
    } else {
      return `${capitalize(selectedCategories[0])},...`;
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start relative z-10">
      <div className="bg-white p-3 rounded-t-lg shadow-md w-full md:w-[290px] flex justify-center md:justify-start items-center border-b border-gray-200">
        {["Alugar", "Comprar"].map((option) => (
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

      <div className="hidden md:flex bg-white p-6 rounded-b-lg shadow-md w-full md:w-[980px]">
        <div className="flex w-full justify-between items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-gray-500 text-[18px]">Localização</p>
              <input
                type="text"
                placeholder="Digite uma localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="font-bold text-[20px] text-black focus:outline-none"
              />
            </div>
          </div>

          <div className="border-l border-gray-300 h-12"></div>

          <div className="flex items-center space-x-4 relative">
            <div onClick={handleDropdownToggle} className="cursor-pointer">
              <p className="text-gray-500 text-[18px]">Tipo</p>
              <p className="font-bold text-[20px] text-black flex items-center">
                {getCategoryText()}
                <ArrowIcon className="ml-2" />
              </p>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-lg border border-gray-200 rounded-md p-4 w-60 max-h-64 overflow-y-auto z-20">
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <Checkbox
                      checked={
                        category === "Todos os tipos"
                          ? selectedCategories.length === categories.length
                          : selectedCategories.includes(category)
                      }
                      onCheckedChange={() => toggleCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={category} className="text-gray-700">
                      {capitalize(category)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-l border-gray-300 h-12"></div>

          <Button variant="large" size="large" onClick={handleSearch}>
            Buscar Propriedades
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
