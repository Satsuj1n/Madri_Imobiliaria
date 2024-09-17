import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/searchIcon.svg';
import { ReactComponent as SearchIconOff } from '../../assets/icons/searchIconOFF.svg';
import { ReactComponent as MapIconOn } from '../../assets/icons/mapON.svg';
import { ReactComponent as MapIconOff } from '../../assets/icons/mapOFF.svg';
import { ReactComponent as DownArrow } from '../../assets/icons/optionsIcon.svg';

const DropdownOptions = () => {
  const [selectedOption, setSelectedOption] = useState('Search with Map');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="w-80 mx-auto my-4">
      <div 
        className="flex justify-between items-center p-3 bg-white border-[2px] border-[#E0DEF7] rounded-lg cursor-pointer" 
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#100A55]">{selectedOption}</span>
        <DownArrow className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </div>
      
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg mt-2 p-2">
          <div 
            className={`flex items-center p-3 hover:bg-[#F7F7FD] cursor-pointer rounded-lg mb-2 ${
              selectedOption === 'Search with Map' 
                ? 'bg-[#F0EFFB] text-[#100A55] font-medium'
                : 'text-[#000929] font-normal'
            }`}
            onClick={() => handleSelectOption('Search with Map')}
          >
            {selectedOption === 'Search with Map' ? <MapIconOn /> : <MapIconOff />} 
            <span className="ml-2">Map</span>
          </div>
          <div 
            className={`flex items-center p-3 hover:bg-[#F7F7FD] cursor-pointer rounded-lg ${
              selectedOption === 'Search with Search Bar' 
                ? 'bg-[#F0EFFB] text-[#100A55] font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => handleSelectOption('Search with Search Bar')}
          >
            {selectedOption === 'Search with Search Bar' ? <SearchIcon /> : <SearchIconOff />} 
            <span className="ml-2">Search Bar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownOptions;
