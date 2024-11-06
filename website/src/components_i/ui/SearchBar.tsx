// SearchBar.tsx

import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Debounce
    setTimeout(() => {
      onSearch(value);
    }, 2000);
  };

  const baseStyles = `flex items-center w-full sm:w-[352px] h-[64px] px-4 rounded-lg border text-gray-700 font-['Plus Jakarta Sans'] text-[16px] leading-[24px]`;

  const variantStyles = isFocused
    ? "border-2 border-primary bg-white shadow"
    : inputValue
    ? "border-2 border-blue-300 bg-[#f9fbff]"
    : "border-2 border-blue-300 bg-[#f9fbff]";

  const inputTextStyles = inputValue
    ? "text-black font-bold"
    : "text-black opacity-50 font-medium";

  return (
    <div className={`${baseStyles} ${variantStyles} mx-auto`}>
      <SearchIcon className="mr-2 w-5 h-5" />
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
