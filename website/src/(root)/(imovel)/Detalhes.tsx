import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Imovel {
  _id: string;
  titulo: string;
  descricao: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeEstado: string;
  quarto: number;
  banheiro: number;
  area: number;
  imagemPrincipal: string;
  tipo: string;
  aluguelValor?: number;
  valor?: number;
}

const Detalhes = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [imovel, setImovel] = useState<Imovel | null>(null); // Estado para armazenar os detalhes do imóvel
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar os detalhes do imóvel com base no ID
  const fetchImovelDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`);
      const data = await response.json();
      setImovel(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do imóvel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImovelDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>;
  }

  if (!imovel) {
    return <p>Imóvel não encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Imagem Principal */}
        <img
          src={imovel.imagemPrincipal}
          alt={imovel.titulo}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        {/* Título e Descrição */}
        <h1 className="text-4xl font-bold mt-6">{imovel.titulo}</h1>
        <p className="text-lg mt-2">{imovel.descricao}</p>

        {/* Preço */}
        <div className="text-[#0053f8] font-bold text-2xl mt-4">
          {imovel.aluguelValor
            ? `R$${imovel.aluguelValor}/mês`
            : imovel.valor
            ? `R$${imovel.valor}`
            : ""}
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full">
          <div className="text-lg">
            <strong>Endereço:</strong> {imovel.endereco}, {imovel.numero},{" "}
            {imovel.bairro}, {imovel.cidadeEstado}
          </div>
          <div className="text-lg">
            <strong>Quartos:</strong> {imovel.quarto}
          </div>
          <div className="text-lg">
            <strong>Banheiros:</strong> {imovel.banheiro}
          </div>
          <div className="text-lg">
            <strong>Área:</strong> {imovel.area} m²
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;
