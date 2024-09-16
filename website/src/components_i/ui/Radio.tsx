import React, { useState } from "react";
import { ReactComponent as CircleUnselected } from "../../assets/icons/circleUnselected.svg";
import { ReactComponent as CircleSelected } from "../../assets/icons/circleSelected.svg";

interface RadioProps {
  value: string;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ value, onChange }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-1.5 focus:outline-none"
    >
      {isSelected ? (
        <CircleSelected className="w-6 h-6" />
      ) : (
        <CircleUnselected className="w-6 h-6" />
      )}
    </button>
  );
};

export { Radio };
