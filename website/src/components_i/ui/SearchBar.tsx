// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Função para lidar com o valor do input e iniciar o debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Define um debounce de 2 segundos para a busca
    const newTimeout = setTimeout(() => {
      onSearch(value);
    }, 2000);

    setDebounceTimeout(newTimeout);
  };

  const baseStyles = `flex items-center w-[352px] h-[64px] px-4 rounded-lg border text-gray-700 font-['Plus Jakarta Sans'] text-[16px] leading-[24px]`;

  const variantStyles = isFocused
    ? "border-2 border-primary bg-white shadow"
    : inputValue
    ? "border-2 border-blue-300 bg-[#f9fbff]"
    : "border-2 border-blue-300 bg-[#f9fbff]";

  const inputTextStyles = inputValue
    ? "text-black font-bold"
    : "text-black opacity-50 font-medium";

  return (
    <div className={`${baseStyles} ${variantStyles}`}>
      <SearchIcon className="mr-4" />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Buscar..."
        className={`w-full bg-transparent outline-none ${inputTextStyles}`}
      />
    </div>
  );
};

export default SearchBar;
