import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import PropertyCard from "./PropertyCard"; // Importe o novo componente
import { ReactComponent as BedIcon } from "../../assets/icons/bedIcon.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bathIcon.svg";
import { ReactComponent as SizeIcon } from "../../assets/icons/sizeIcon.svg";

// Interface para lidar com imóveis de aluguel e venda
interface Imovel {
  _id: string;
  cep?: string; // Opcional para imóveis de venda
  titulo: string;
  descricao?: string; // Adicionando a descrição do imóvel
  aluguelValor?: number; // Opcional para imóveis de aluguel
  valor?: number; // Opcional para imóveis de venda
  imagemPrincipal?: string; // URL da imagem principal do imóvel
  quarto?: number; // Número de quartos
  banheiro?: number; // Número de banheiros
  area?: number; // Área do imóvel em m²
}

interface MapComponentProps {
  imoveis: Imovel[];
  disableClick?: boolean; // Propriedade para desabilitar o clique
}

const MapComponent: React.FC<MapComponentProps> = ({
  imoveis,
  disableClick = false,
}) => {
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
    disableDoubleClickZoom: true, // Desativa o zoom ao dar duplo clique
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

  // Carregando a API do Google Maps com a chave da API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    language: "pt-BR", // Adiciona o idioma português
  });

  // Função para buscar coordenadas com base no CEP
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

  // Hook para buscar coordenadas de todos os imóveis
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API não está carregada corretamente.");
        return;
      }

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

    if (isLoaded && imoveis.length > 0) {
      fetchCoordinates();
    }
  }, [imoveis, isLoaded]);

  // Função para manipular cliques em marcadores
  const handleMarkerClick = (imovelId: string, lat: number, lng: number) => {
    if (disableClick) return; // Se o clique estiver desabilitado, não faz nada
    const imovel = imoveis.find((item) => item._id === imovelId);
    if (imovel && mapInstance) {
      setSelectedImovel(imovel);
      setSelectedPosition({ lat, lng });
      mapInstance.panTo({ lat, lng });
      mapInstance.setZoom(18);
      console.log(`Imóvel ${imovelId} selecionado. Posição:`, { lat, lng });
    }
  };

  const handleCloseCard = () => {
    setSelectedImovel(null);
    setSelectedPosition(null);
    console.log("Fechando o card do imóvel selecionado.");
  };

  if (loadError) {
    return <p>Erro ao carregar o Google Maps.</p>;
  }

  if (!isLoaded) {
    return <p>Carregando o Google Maps...</p>;
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={selectedPosition ? 15 : 14}
        center={
          selectedPosition
            ? selectedPosition
            : mapBounds
            ? mapBounds.getCenter().toJSON()
            : { lat: -15.7942, lng: -47.8825 }
        }
        options={mapOptions}
        onLoad={(map) => {
          setMapInstance(map);
          if (mapBounds) {
            map.fitBounds(mapBounds);
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
              }
            >
              R${coords.preco.toLocaleString("pt-BR")}
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
            getPixelPositionOffset={() => ({ x: -150, y: -220 })}
          >
            <PropertyCard imovel={selectedImovel} onClose={handleCloseCard} />
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
