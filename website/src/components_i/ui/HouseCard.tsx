import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

interface HouseCardProps {
  id: string;
  aluguelValor: string;
  titulo: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  outrasImagens?: string[];
  tipo: string;
}

const HouseCard: React.FC<HouseCardProps> = ({
  id,
  aluguelValor,
  titulo,
  endereco,
  numero,
  bairro,
  cidadeEstado,
  quarto,
  banheiro,
  area,
  imagemPrincipal,
  outrasImagens = [],
  tipo,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    const loadedImages = [imagemPrincipal, ...outrasImagens];
    setImagens(loadedImages);
    console.log("Imagens carregadas no componente:", loadedImages);
  }, []);

  const handleCardClick = () => {
    navigate(`/imovel/${id}`);
  };

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    console.log("Próxima imagem. Índice ativo:", activeIndex, "Total de imagens:", imagens.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imagens.length - 1 : prevIndex - 1
    );
    console.log("Imagem anterior. Índice ativo:", activeIndex, "Total de imagens:", imagens.length);
  };

  return (
    <div
      className="border rounded-lg shadow-md bg-white cursor-pointer h-[400px] w-[350px] flex flex-col justify-between z-10"
      onClick={handleCardClick}
    >
      {/* Carrossel de Imagens */}
      <div className="h-[200px] w-full overflow-hidden rounded-t-lg relative">
        <img
          src={imagens[activeIndex]}
          alt={titulo}
          className="w-full h-full object-cover"
        />

        {/* Botões de navegação apenas se houver mais de uma imagem */}
        {imagens.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full z-15 h-8 w-8 flex items-center justify-center"
            >
              &#10094;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-2 rounded-full z-15 h-8 w-8 flex items-center justify-center"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Indicadores de imagem (bolinhas) */}
        {imagens.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {imagens.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === index ? "bg-[#0053f8]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between">
        <div className="text-[#0053f8] font-bold text-2xl">
          {aluguelValor}
          {tipo === "aluguel" && (
            <span className="text-[#000929] text-base font-normal opacity-50">
              {" "}
              / mês
            </span>
          )}
        </div>
        <h4 className="text-[#000929] font-bold text-xl mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {titulo}
        </h4>
        <p className="text-[#6C727F] font-normal text-sm mt-1">
          {endereco}, {numero}, {bairro}
          <br />
          {cidadeEstado}
        </p>
        <div className="border-t mt-4 mb-4 border-gray-200"></div>
        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center">
            <BedIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {quarto}
            </span>
          </div>
          <div className="flex items-center">
            <BathIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {banheiro}
            </span>
          </div>
          <div className="flex items-center">
            <SizeIcon />
            <span className="text-[#6C727F] ml-2 font-normal text-sm">
              {area} m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
