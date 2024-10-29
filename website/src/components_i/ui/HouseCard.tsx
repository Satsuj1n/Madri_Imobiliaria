import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirecionamento
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

interface HouseCardProps {
  id: string; // Adicionei o id para ser usado no redirecionamento
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
  tipo: string; // Adicionada nova prop para indicar o tipo do imóvel (aluguel ou venda)
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
  tipo,
}) => {
  const navigate = useNavigate(); // Hook para redirecionar

  const handleCardClick = () => {
    navigate(`/imovel/${id}`); // Redireciona para a página de detalhes usando o id do imóvel
  };

  return (
    <div
      className="border rounded-lg shadow-md bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Imagem da Casa */}
      <img
        src={imagemPrincipal}
        alt={titulo}
        className="rounded-t-lg w-full h-[200px] object-cover"
      />

      <div className="p-6">
        {/* Preço */}
        <div className="text-[#0053f8] font-bold text-2xl">
          {aluguelValor}
          {tipo === "aluguel" && ( // Exibe "/mês" apenas se for aluguel
            <span className="text-[#000929] text-base font-normal opacity-50">
              {" "}
              / mês
            </span>
          )}
        </div>

        {/* Nome da Propriedade */}
        <h4 className="text-[#000929] font-bold text-xl mt-2 whitespace-nowrap">
          {titulo}
        </h4>

        {/* Localização */}
        <p className="text-[#6C727F] font-normal text-sm mt-1">
          {endereco}, {numero}, {bairro}
          <br />
          {cidadeEstado}
        </p>

        {/* Linha separadora */}
        <div className="border-t mt-4 mb-4 border-gray-200"></div>

        {/* Ícones com informações */}
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
