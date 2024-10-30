import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

// Atualizamos a interface para lidar com imóveis de aluguel e venda
interface Imovel {
  _id: string;
  cep?: string; // Opcional para imóveis de venda
  titulo: string;
  aluguelValor?: number; // Opcional para imóveis de aluguel
  valor?: number; // Opcional para imóveis de venda
  imagemPrincipal?: string; // URL da imagem principal do imóvel
  quarto?: number; // Número de quartos
  banheiro?: number; // Número de banheiros
  area?: number; // Área do imóvel em m²
}

interface MapComponentProps {
  imoveis: Imovel[];
}

const MapComponent: React.FC<MapComponentProps> = ({ imoveis }) => {
  console.log("MapComponent: renderizou o componente");

  const [coordinatesList, setCoordinatesList] = useState<
    { lat: number; lng: number; _id: string; preco: number }[]
  >([]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null); // Estado para o imóvel selecionado
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // Posição do imóvel selecionado
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null); // Referência ao mapa

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true, // Desativa toda a UI padrão
    zoomControl: true, // Habilita apenas o controle de zoom
    streetViewControl: false, // Desativa o controle de Street View
    fullscreenControl: false, // Desativa o controle de tela cheia
    mapTypeControl: false, // Desativa o controle de tipo de mapa
    scaleControl: false, // Desativa a escala do mapa
    rotateControl: false, // Desativa a rotação do mapa
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const getCoordinatesFromCep = async (cep: string) => {
    console.log(`Buscando coordenadas para o CEP: ${cep}`);
    try {
      const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
      const data = await response.json();
      if (data.lat && data.lng) {
        console.log(`Coordenadas obtidas para o CEP ${cep}:`, data);
        return { lat: parseFloat(data.lat), lng: parseFloat(data.lng) };
      } else {
        console.error("Nenhuma coordenada encontrada para o CEP:", cep);
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas para o CEP:", cep, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      console.log("Iniciando busca de coordenadas...");
      const newCoordinatesList: {
        lat: number;
        lng: number;
        _id: string;
        preco: number;
      }[] = [];
      const bounds = new window.google.maps.LatLngBounds();

      for (const imovel of imoveis) {
        if (imovel.cep) {
          const coords = await getCoordinatesFromCep(imovel.cep);
          if (coords) {
            const preco = imovel.aluguelValor || imovel.valor || 0;
            newCoordinatesList.push({
              ...coords,
              _id: imovel._id,
              preco,
            });

            bounds.extend({ lat: coords.lat, lng: coords.lng });
            console.log(
              `Coordenadas adicionadas para o imóvel ${imovel._id}:`,
              coords
            );
          }
        }
      }

      setCoordinatesList(newCoordinatesList);
      if (newCoordinatesList.length > 0) {
        setMapBounds(bounds);
        console.log("Limites ajustados para o mapa:", bounds);
      }
    };

    if (imoveis.length > 0) {
      fetchCoordinates();
    }
  }, [imoveis]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    language: "pt-BR", // Adiciona o idioma português
  });

  if (loadError) {
    return <p>Erro ao carregar o Google Maps.</p>;
  }

  if (!isLoaded) {
    return <p>Carregando o Google Maps...</p>;
  }

  const handleMarkerClick = (imovelId: string, lat: number, lng: number) => {
    const imovel = imoveis.find((item) => item._id === imovelId);
    if (imovel && mapInstance) {
      setSelectedImovel(imovel); // Armazena o imóvel selecionado no estado
      setSelectedPosition({ lat, lng }); // Define a posição selecionada
      mapInstance.panTo({ lat, lng }); // Centraliza o mapa no imóvel selecionado
      mapInstance.setZoom(18); // Ajusta o zoom para um valor mais aproximado
      console.log(`Imóvel ${imovelId} selecionado. Posição:`, { lat, lng });
    }
  };

  const handleCloseCard = () => {
    setSelectedImovel(null);
    setSelectedPosition(null);
    console.log("Fechando o card do imóvel selecionado.");
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={selectedPosition ? 18 : 16} // Mantém o zoom padrão se não houver posição selecionada
        center={
          selectedPosition
            ? selectedPosition
            : mapBounds
            ? mapBounds.getCenter().toJSON()
            : { lat: -15.7942, lng: -47.8825 } // Brasília como fallback
        }
        options={mapOptions}
        onLoad={(map) => {
          setMapInstance(map); // Guarda a referência do mapa
          if (mapBounds) {
            map.fitBounds(mapBounds); // Ajusta o zoom e o centro para cobrir todos os imóveis
          }
          console.log("Mapa carregado.");
        }}
      >
        {coordinatesList.map((coords) => (
          <OverlayView
            key={coords._id}
            position={{ lat: coords.lat, lng: coords.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="price-box bg-white text-[#0053f8] p-2 flex justify-center items-center text-center rounded-lg shadow-lg font-bold cursor-pointer px-6"
              style={{ minWidth: `${coords.preco.toString().length * 10}px` }}
              onClick={() =>
                handleMarkerClick(coords._id, coords.lat, coords.lng)
              } // Ação ao clicar no box
            >
              R${coords.preco}
            </div>
          </OverlayView>
        ))}

        {/* Card que mostra o imóvel selecionado */}
        {selectedImovel && selectedPosition && (
          <OverlayView
            position={{
              lat: selectedPosition.lat,
              lng: selectedPosition.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={() => ({ x: -150, y: -220 })} // Ajusta o card para aparecer acima do marcador e centralizado
          >
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6 w-80 relative">
              <button
                className="absolute font-bold top-0 left-0 text-xl m-2 text-blue-700 hover:text-blue-950"
                onClick={handleCloseCard}
              >
                ✕
              </button>
              <h2 className="text-lg font-bold mb-2 text-center">
                {selectedImovel.titulo}
              </h2>
              {selectedImovel.imagemPrincipal ? (
                <img
                  src={selectedImovel.imagemPrincipal}
                  alt={selectedImovel.titulo}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <span>Imagem não disponível</span>
                </div>
              )}

              {/* Ícones com informações */}
              <div className="flex items-center justify-start gap-6 mt-4">
                <div className="flex items-center">
                  <BedIcon />
                  <span className="text-[#6C727F] ml-2 font-normal text-sm">
                    {selectedImovel.quarto || "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <BathIcon />
                  <span className="text-[#6C727F] ml-2 font-normal text-sm">
                    {selectedImovel.banheiro || "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <SizeIcon />
                  <span className="text-[#6C727F] ml-2 font-normal text-sm">
                    {selectedImovel.area ? `${selectedImovel.area} m²` : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
