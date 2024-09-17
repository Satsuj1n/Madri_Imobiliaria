import React, { useState } from "react";

interface AmenitiesProps {
  selected?: boolean;
  onClick?: () => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md border text-center
        ${
          selected
            ? "border-[#7065F0] bg-[#E8E6F9] text-[#7065F0]"
            : "border-[#E0DEF7] bg-white text-[#000929]"
        } font-['Plus Jakarta Sans'] text-[16px] font-normal leading-[24px]`}
    >
      Amenities
    </button>
  );
};

const SingleAmenities: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div className="flex justify-center mt-4">
      <Amenities selected={isSelected} onClick={handleClick} />
    </div>
  );
};

export { SingleAmenities };
