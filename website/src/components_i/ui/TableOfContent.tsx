import React, { useState } from "react";

interface TableOfContentProps {
  options: string[];
}

const TableOfContent: React.FC<TableOfContentProps> = ({ options }) => {
  const [selected, setSelected] = useState<string>(options[0]); // Por padrão, selecione a primeira opção

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="flex flex-col items-start space-y-1 md:space-y-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`cursor-pointer py-1 md:py-2 text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] font-medium font-['Plus Jakarta Sans'] tracking-[0.02em] ${
            selected === option
              ? "text-[#000929] font-bold border-l-2 border-[#0053f8] pl-3 md:pl-4"
              : "text-[#394150] font-medium pl-4 md:pl-6"
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default TableOfContent;
