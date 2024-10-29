import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

// Definição da interface de Imovel para o uso do tipo recebido da API
interface Imovel {
  _id: string;
  titulo: string;
  descricao?: string;
  endereco: string;
  cep: number;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  aluguelValor?: number;
  valor?: number;
  imagemPrincipal?: string;
  outrasImagens?: string[];
  status: string;
  cidadeEstado?: string;
}

const Detalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do imóvel da URL
  const [imovel, setImovel] = useState<Imovel | null>(null); // Estado para armazenar o imóvel
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para buscar os detalhes do imóvel baseado no ID
  const fetchImovelDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`);
      const data = await response.json();
      setImovel(data); // Armazena os detalhes do imóvel no estado
    } catch (error) {
      console.error("Erro ao buscar os detalhes do imóvel:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchImovelDetails(); // Busca os detalhes do imóvel quando o componente é montado
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes do imóvel...</p>; // Exibe enquanto os dados estão sendo carregados
  }

  if (!imovel) {
    return <p>Imóvel não encontrado.</p>; // Exibe se nenhum imóvel for encontrado
  }

  // Função para gerar as iniciais do cliente
  const getClientInitials = (nome: string) => {
    const [firstName, lastName] = nome.split(" ");
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F7F7FD] min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Voltar ao mapa */}
          <a
            href="/map"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            &larr; Voltar ao mapa
          </a>

          {/* Título e Endereço */}
          <h1 className="text-4xl font-bold mt-8">{imovel.titulo}</h1>
          <p className="text-gray-600 text-lg mb-4">
            {imovel.endereco}, {imovel.cidadeEstado}
          </p>

          {/* Imagem Principal e Galeria de Imagens */}
          <div className="flex gap-4 mb-8">
            {/* Imagem Principal */}
            <div className="w-2/3">
              <img
                src={imovel.imagemPrincipal}
                alt={imovel.titulo}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Imagens Secundárias */}
            <div className="w-1/3 flex flex-col gap-4">
              {imovel.outrasImagens && imovel.outrasImagens.length > 0 ? (
                imovel.outrasImagens
                  .slice(0, 4)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-[120px] object-cover rounded-lg shadow-lg"
                    />
                  ))
              ) : (
                <p>Nenhuma outra imagem disponível.</p>
              )}
              {imovel.outrasImagens && imovel.outrasImagens.length > 4 && (
                <button className="text-blue-600 hover:underline">
                  Ver todas as fotos
                </button>
              )}
            </div>
          </div>

          {/* Conteúdo dividido em duas colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna da Esquerda */}
            <div className="col-span-2">
              {/* Características do Imóvel */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <BedIcon />
                    <span className="text-gray-600 font-medium">
                      {imovel.quarto} Quartos
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BathIcon />
                    <span className="text-gray-600 font-medium">
                      {imovel.banheiro} Banheiros
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SizeIcon />
                    <span className="text-gray-600 font-medium">
                      {imovel.area} m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Sobre este imóvel</h3>
                <p className="text-gray-700">{imovel.descricao}</p>
              </div>

              {/* Informações do Cliente */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">
                  Informações do Cliente
                </h2>
                <div className="flex items-center space-x-4">
                  {/* Foto gerada com as iniciais do cliente */}
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {getClientInitials(imovel.cliente.nome)}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{imovel.cliente.nome}</p>
                    <p className="text-gray-600">{imovel.cliente.email}</p>
                    <p className="text-gray-600">{imovel.cliente.telefone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Box de Preço */}
            <div className="bg-white p-4 rounded-lg shadow-md max-w-sm h-36 flex flex-col justify-between">
              <div>
                <h3 className="text-gray-500">Preço</h3>
                <p className="text-4xl font-bold text-blue-500">
                  {imovel.tipo === "aluguel"
                    ? `R$${imovel.aluguelValor?.toLocaleString()}/mês`
                    : `R$${imovel.valor?.toLocaleString()}`}
                </p>
              </div>
              <button className="bg-blue-500 text-white w-full py-2 rounded-lg font-bold hover:bg-blue-600">
                Solicitar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detalhes;
