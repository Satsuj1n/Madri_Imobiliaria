import React from 'react';
import { ReactComponent as BedIcon } from '../../assets/icons/bedIcon.svg';
import { ReactComponent as BathIcon } from '../../assets/icons/bathIcon.svg';
import { ReactComponent as SizeIcon } from '../../assets/icons/sizeIcon.svg';

// Defina a interface para os props do componente
interface HouseCardProps {
  price: string;
  name: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
}

const HouseCard: React.FC<HouseCardProps> = ({ price, name, location, beds, baths, size }) => {
  return (
    <div className="border rounded-lg shadow-md w-[324px] bg-white">
      {/* Imagem da Casa */}
      <img
        src="https://i.imgur.com/Z18jPaq.png" // Placeholder para a imagem da casa
        alt={name}
        className="rounded-t-lg w-full h-[200px] object-cover"
      />

      <div className="p-4">
        {/* Preço */}
        <div className="text-[#7065F0] font-bold text-2xl">
          {price}
          <span className="text-[#000929] text-base font-normal opacity-50"> /month</span>
        </div>

        {/* Nome da Propriedade */}
        <h4 className="text-[#000929] font-bold text-xl mt-2">{name}</h4>

        {/* Localização */}
        <p className="text-[#6C727F] font-normal text-sm mt-1">{location}</p>

        {/* Ícones com informações */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <BedIcon />
            <span className="text-[#6C727F] ml-2"> {beds}</span>
          </div>
          <div className="flex items-center">
            <BathIcon />
            <span className="text-[#6C727F] ml-2"> {baths}</span>
          </div>
          <div className="flex items-center">
            <SizeIcon />
            <span className="text-[#6C727F] ml-2">{size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
