import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

interface HouseCardHorizontalProps {
  id: string;
  titulo: string;
  situacao?: string;
  endereco: string;
  cep: number;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria: string;
  IPTUAnual?: number;
  IPTUMensal?: number;
  valor?: number;
  aluguelValor?: number;
  areaExterna?: number;
  areaInterna?: number;
  imagemPrincipal: string;
  dataDisponivelInicio?: Date;
  dataDisponivelFim?: Date;
}

const HouseCardHorizontal: React.FC<HouseCardHorizontalProps> = ({
  id,
  titulo,
  situacao,
  endereco,
  cep,
  area,
  quarto,
  banheiro,
  tipo,
  categoria,
  IPTUAnual,
  IPTUMensal,
  valor,
  aluguelValor,
  areaExterna,
  areaInterna,
  imagemPrincipal,
  dataDisponivelInicio,
  dataDisponivelFim,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/imovel/${id}`);
  };

  const areaTotal = (areaInterna || 0) + (areaExterna || 0); // Calcula a área total

  return (
    <div
      className="flex flex-col sm:flex-row border rounded-lg shadow-md bg-white cursor-pointer h-auto sm:h-[300px] w-full"
      onClick={handleCardClick}
    >
      {/* Imagem maior horizontalmente */}
      <div className="w-full sm:w-[300px] h-[200px] sm:h-full overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
        <img
          src={imagemPrincipal}
          alt={titulo}
          className="w-full h-full object-cover rounded-tl-md"
        />
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col justify-between w-full">
        {/* Título, Categoria e Situação */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h4 className="text-lg sm:text-xl font-bold text-[#000929]">
            {titulo}
          </h4>
          <span className="text-sm text-[#6C727F] font-normal mt-1 sm:mt-0">
            {situacao || "Desconhecido"}
          </span>
        </div>

        {/* Tipo e Categoria destacados */}
        <div className="text-sm text-[#6C727F] mt-1">
          <span className="text-[#0053f8] font-semibold">Tipo:</span>{" "}
          {tipo === "aluguel" ? "Aluguel" : "Venda"} -{" "}
          <span className="text-[#0053f8] font-semibold">Categoria:</span>{" "}
          {categoria}
        </div>

        {/* Localização */}
        <p className="text-sm text-[#6C727F] mt-2">
          {endereco}, CEP: {cep}
        </p>

        {/* Informações principais */}
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center">
            <BedIcon />
            <span className="ml-2 text-[#6C727F] text-sm">
              {quarto} Quartos
            </span>
          </div>
          <div className="flex items-center">
            <BathIcon />
            <span className="ml-2 text-[#6C727F] text-sm">
              {banheiro} Banheiros
            </span>
          </div>
          <div className="flex items-center">
            <SizeIcon />
            <span className="ml-2 text-[#6C727F] text-sm">
              Área Total: {areaTotal} m²
            </span>
          </div>
        </div>

        {/* Valor ou Aluguel */}
        <div className="mt-3 text-[#0053f8] text-lg font-bold">
          {tipo === "aluguel" ? `R$ ${aluguelValor} /mês` : `R$ ${valor}`}
        </div>

        {/* IPTU */}
        <div className="text-sm text-[#6C727F] mt-2">
          IPTU Anual: {IPTUAnual ? `R$ ${IPTUAnual}` : "N/A"}
          <br />
          IPTU Mensal: {IPTUMensal ? `R$ ${IPTUMensal}` : "N/A"}
        </div>

        {/* Datas de Disponibilidade - apenas para aluguel */}
        {tipo === "aluguel" && (
          <div className="text-sm text-[#6C727F] mt-2">
            Disponível de:{" "}
            {dataDisponivelInicio
              ? new Date(dataDisponivelInicio).toLocaleDateString()
              : "Indisponível"}{" "}
            até{" "}
            {dataDisponivelFim
              ? new Date(dataDisponivelFim).toLocaleDateString()
              : "Indisponível"}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseCardHorizontal;
