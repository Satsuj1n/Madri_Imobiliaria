import React from "react";
import { ReactComponent as KeyOn } from "../../assets/icons/keyON.svg";
import { ReactComponent as KeyOff } from "../../assets/icons/keyOFF.svg";
import { ReactComponent as BuyIconOn } from "../../assets/icons/buyIconON.svg";
import { ReactComponent as BuyIconOff } from "../../assets/icons/buyIconOFF.svg";

interface SegmentedControlProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const options = [
    { value: "Alugar", IconOn: KeyOn, IconOff: KeyOff },
    { value: "Comprar", IconOn: BuyIconOn, IconOff: BuyIconOff },
  ];

  const buttonStyles = `inline-flex items-center justify-center gap-2 p-1.5 md:p-2 rounded-md cursor-pointer`;
  const selectedStyles = `bg-white border-2 border-[#0053f8] shadow px-3 md:px-4`;
  const nonSelectedStyles = `border-transparent text-[#100A55]`;

  return (
    <div className="flex justify-center items-center p-1.5 md:p-2 rounded-lg border border-blue-300 bg-[#f9fbff] gap-1 md:gap-2">
      {options.map(({ value, IconOn, IconOff }) => (
        <div
          key={value}
          className={`flex ${buttonStyles} ${
            selectedType === value ? selectedStyles : nonSelectedStyles
          }`}
          onClick={() => onTypeChange(selectedType === value ? null : value)}
        >
          {selectedType === value ? (
            <IconOn className="w-4 h-4 md:w-5 md:h-5 mr-0.5" />
          ) : (
            <IconOff className="w-4 h-4 md:w-5 md:h-5 mr-0.5" />
          )}
          <span
            className={`${
              selectedType === value
                ? "text-[#0053f8] font-bold"
                : "text-[#100A55] font-medium"
            } text-md md:text-lg`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
