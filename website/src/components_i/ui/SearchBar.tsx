import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/searchIcon.svg';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `flex items-center w-[352px] h-[64px] px-4 rounded-lg border text-gray-700 font-['Plus Jakarta Sans'] text-[16px] leading-[24px]`;

  const variantStyles = isFocused
    ? 'border-2 border-primary bg-white shadow'
    : inputValue
    ? 'border-2 border-blue-300 bg-[#f9fbff]'
    : 'border-2 border-blue-300 bg-[#f9fbff]';

  const inputTextStyles = inputValue
    ? 'text-black font-bold'
    : 'text-black opacity-50 font-medium';

  return (
    <div className={`${baseStyles} ${variantStyles}`}>
      <SearchIcon className="mr-4" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Buscar..."
        className={`w-full bg-transparent outline-none ${inputTextStyles}`}
      />
    </div>
  );
};

export default SearchBar;
