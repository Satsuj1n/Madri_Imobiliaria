import React, { useState } from "react";
import { ReactComponent as KeyOn } from "../../assets/icons/keyON.svg";
import { ReactComponent as KeyOff } from "../../assets/icons/keyOFF.svg";
import { ReactComponent as BuyIconOn } from "../../assets/icons/buyIconON.svg";
import { ReactComponent as BuyIconOff } from "../../assets/icons/buyIconOFF.svg";
import { ReactComponent as SellIconOn } from "../../assets/icons/sellIconON.svg";
import { ReactComponent as SellIconOff } from "../../assets/icons/sellIconOFF.svg";

const SegmentedControl = () => {
  const [selected, setSelected] = useState("Rent");

  const options = [
    { value: "Alugar", IconOn: KeyOn, IconOff: KeyOff },
    { value: "Comprar", IconOn: BuyIconOn, IconOff: BuyIconOff },
    { value: "Vender", IconOn: SellIconOn, IconOff: SellIconOff },
  ];

  const buttonStyles = `inline-flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer`;
  const selectedStyles = `bg-white border-2 border-[#0053f8] shadow px-4`; // Adicionado px-4 para espaçamento lateral
  const nonSelectedStyles = `border-transparent text-[#100A55]`;

  return (
    <div className="flex justify-center items-center p-2 rounded-lg border border-blue-300 bg-[#f9fbff] gap-2">
      {" "}
      {/* Ajustado gap-2 para 8px de espaçamento entre opções */}
      {options.map(({ value, IconOn, IconOff }) => (
        <div
          key={value}
          className={`flex ${buttonStyles} ${
            selected === value ? selectedStyles : nonSelectedStyles
          }`}
          onClick={() => setSelected(value)}
          style={{ paddingRight: "22px" }} // Ajuste de padding para a opção selecionada
        >
          {selected === value ? (
            <IconOn className="mr-0.5" />
          ) : (
            <IconOff className="mr-0.5" />
          )}
          <span
            className={`${
              selected === value
                ? "text-[#0053f8] font-bold"
                : "text-[#100A55] font-medium"
            } text-lg`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
