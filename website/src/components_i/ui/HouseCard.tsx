import React from "react";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

interface HouseCardProps {
  price: string;
  name: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
  image: string;
}

const HouseCard: React.FC<HouseCardProps> = ({
  price,
  name,
  location,
  beds,
  baths,
  size,
  image,
}) => {
  return (
    <div className={`border rounded-lg shadow-md bg-white mb-8`}>
      {/* Imagem da Casa */}
      <img
        src={image}
        alt={name}
        className="rounded-t-lg w-full h-[200px] object-fill"
      />

      <div className="p-6">
        {/* Preço */}
        <div className="text-[#0053f8] font-bold text-2xl">
          {price}
          <span className="text-[#000929] text-base font-normal opacity-50"></span>
        </div>

        {/* Nome da Propriedade */}
        <h4 className="text-[#000929] font-bold text-xl mt-2">{name}</h4>

        {/* Localização */}
        <p className="text-[#6C727F] font-normal text-sm mt-1">{location}</p>

        {/* Linha separadora */}
        <div className="border-t mt-4 mb-4 border-gray-200"></div>

        {/* Ícones com informações */}
        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center">
            <BedIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {beds}
            </span>
          </div>
          <div className="flex items-center">
            <BathIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {baths}
            </span>
          </div>
          <div className="flex items-center">
            <SizeIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
