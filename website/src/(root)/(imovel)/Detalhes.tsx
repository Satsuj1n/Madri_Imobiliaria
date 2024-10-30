import React, { useEffect, useState, useRef } from "react";
import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import { useParams } from "react-router-dom";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";
import MapComponent from "components_i/ui/MapComponent";

// Definição da interface de Imovel para o uso do tipo recebido da API
interface Imovel {
  _id: string;
  titulo: string;
  descricao?: string;
  endereco: string;
  cep: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [activeIndex, setActiveIndex] = useState(0); // Estado para controlar o índice ativo da imagem
  const [mapError, setMapError] = useState(false); // Estado para tratar erro do mapa

  // Refs para a descrição, o cliente e o mapa
  const descricaoRef = useRef<HTMLDivElement>(null);
  const clienteRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

  // Função para verificar timeout do carregamento do mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapError(true); // Define erro caso o mapa não carregue após 10 segundos
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Efeito para sincronizar a altura do mapa com a altura da descrição e do cliente
  useEffect(() => {
    const adjustMapHeight = () => {
      if (descricaoRef.current && clienteRef.current && mapRef.current) {
        const descricaoHeight = descricaoRef.current.offsetHeight;
        const clienteHeight = clienteRef.current.offsetHeight;
        const totalHeight = descricaoHeight + clienteHeight;
        mapRef.current.style.height = `${totalHeight}px`;
      }
    };

    if (imovel) {
      adjustMapHeight();
      window.addEventListener("resize", adjustMapHeight); // Ajusta em caso de redimensionamento
    }

    return () => {
      window.removeEventListener("resize", adjustMapHeight);
    };
  }, [imovel]);

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

  // Função para avançar para a próxima imagem
  const nextImage = () => {
    if (imovel.outrasImagens) {
      setActiveIndex((prevIndex) =>
        prevIndex === imovel.outrasImagens!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Função para voltar para a imagem anterior
  const prevImage = () => {
    if (imovel.outrasImagens) {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? imovel.outrasImagens!.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F7F7FD] min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Título e Endereço */}
          <h1 className="text-4xl font-bold mt-16">{imovel.titulo}</h1>
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
            <div className="w-1/3 flex flex-col gap-4 relative">
              {imovel.outrasImagens && imovel.outrasImagens.length > 0 ? (
                imovel.outrasImagens
                  .slice(0, 2)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-[240px] object-cover rounded-lg shadow-lg"
                    />
                  ))
              ) : (
                <p>Nenhuma outra imagem disponível.</p>
              )}

              {imovel.outrasImagens && imovel.outrasImagens.length > 2 && (
                <Button
                  variant="default"
                  size="md"
                  className="absolute bottom-3 right-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  Ver todas as fotos
                </Button>
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
              <div className="mb-8" ref={descricaoRef}>
                <h3 className="text-xl font-bold mb-2">Sobre este imóvel</h3>
                <p className="text-gray-700">{imovel.descricao}</p>
              </div>

              {/* Informações do Cliente */}
              <div
                className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl"
                ref={clienteRef}
              >
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

            {/* Coluna da Direita: Box de Preço e Mapa */}
            <div>
              {/* Box de Preço */}
              <div className="bg-white p-4 rounded-lg shadow-md max-w-sm h-36 flex flex-col justify-between mb-4">
                <div>
                  <h3 className="text-gray-500">Preço</h3>
                  <p className="text-4xl font-bold text-blue-500">
                    {imovel.tipo === "aluguel"
                      ? `R$${imovel.aluguelValor?.toLocaleString()}/mês`
                      : `R$${imovel.valor?.toLocaleString()}`}
                  </p>
                </div>
                <Button variant="default" size="md" className="w-full">
                  Solicitar agora
                </Button>
              </div>

              {/* Mapa com o Pin */}
              <div
                className="bg-white p-4 rounded-lg shadow-md max-w-sm"
                ref={mapRef}
              >
                {!mapError ? (
                  <MapComponent imoveis={[imovel]} />
                ) : (
                  <p>Não foi possível carregar o mapa.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal para o carrossel */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="relative">
              {/* Botão Fechar no canto superior esquerdo, fora da imagem */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 left-2 bg-opacity-75 bg-blue-700 text-white rounded-full p-1 px-3 z-50"
              >
                x
              </button>

              {/* Carrossel de imagens com tamanho padronizado */}
              <div className="relative w-full h-[500px]">
                {imovel.outrasImagens && imovel.outrasImagens.length > 0 && (
                  <img
                    src={imovel.outrasImagens[activeIndex]}
                    alt={`Imagem ${activeIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
                {/* Controles para navegação */}
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-opacity-50 bg-blue-700 text-white p-1 px-3 rounded-full"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-opacity-50 bg-blue-700 text-white p-1 px-3 rounded-full"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Detalhes;
