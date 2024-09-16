import React, { useState } from "react";
import { ReactComponent as ToggleOn } from "../../assets/icons/toggleON.svg";
import { ReactComponent as ToggleOff } from "../../assets/icons/toggleOFF.svg";

interface ToggleProps {
  onChange?: (value: boolean) => void;
  initialState?: boolean; // Estado inicial do toggle
}

const Toggle: React.FC<ToggleProps> = ({ onChange, initialState = false }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center focus:outline-none"
    >
      {isOn ? (
        <ToggleOn className="w-8 h-8" /> // tamanho pode ser ajustado conforme necessário
      ) : (
        <ToggleOff className="w-8 h-8" />
      )}
    </button>
  );
};

export { Toggle };
