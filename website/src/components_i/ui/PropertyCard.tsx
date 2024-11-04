import React, { FC, useState, useEffect } from "react";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

interface PropertyCardProps {
  imovel: {
    titulo: string;
    descricao?: string;
    imagemPrincipal?: string;
    outrasImagens?: string[];
    quarto?: number;
    banheiro?: number;
    area?: number;
    aluguelValor?: number;
    valor?: number;
  };
  onClose: () => void;
}

const PropertyCard: FC<PropertyCardProps> = ({ imovel, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    const loadedImages = [imovel.imagemPrincipal, ...(imovel.outrasImagens || [])].filter(Boolean) as string[];
    setImagens(loadedImages);
  }, [imovel]);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? imagens.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-80 relative">
      {/* Botão de fechamento no canto superior direito */}
      <button
        className="absolute top-2 right-2 text-blue-700 text-2xl font-bold hover:text-blue-500 z-10"
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* Carrossel de Imagens */}
      <div className="h-48 w-full overflow-hidden rounded-t-lg relative">
        {imagens.length > 0 ? (
          <img
            src={imagens[activeIndex]}
            alt={imovel.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <span>Imagem não disponível</span>
          </div>
        )}

        {imagens.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center z-10"
            >
              &#10094;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center z-10"
            >
              &#10095;
            </button>
          </>
        )}

        {imagens.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {imagens.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${activeIndex === index ? "bg-[#0053f8]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-1 truncate">{imovel.titulo}</h2>
        <p className="text-gray-500 text-sm mb-2 truncate">
          {imovel.descricao ?? "Descrição não disponível"}
        </p>

        <div className="flex items-center justify-start gap-4 mt-2 mb-3">
          <div className="flex items-center">
            <BedIcon />
            <span className="text-[#6C727F] ml-1 text-sm">{imovel.quarto || 0}</span>
          </div>
          <div className="flex items-center">
            <BathIcon />
            <span className="text-[#6C727F] ml-1 text-sm">{imovel.banheiro || 0}</span>
          </div>
          <div className="flex items-center">
            <SizeIcon />
            <span className="text-[#6C727F] ml-1 text-sm">
              {imovel.area ? `${imovel.area} m²` : "N/A"}
            </span>
          </div>
        </div>

        <div className="text-blue-700 text-xl font-bold">
          R${(imovel.aluguelValor || imovel.valor)?.toLocaleString("pt-BR")}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
