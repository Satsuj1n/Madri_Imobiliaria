import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";

interface Imovel {
  _id: string;
  cep: string;
  titulo: string;
  aluguelValor: number;
}

interface MapComponentProps {
  imoveis: Imovel[];
}

const MapComponent: React.FC<MapComponentProps> = ({ imoveis }) => {
  const [coordinatesList, setCoordinatesList] = useState<
    { lat: number; lng: number; _id: string; aluguelValor: number }[]
  >([]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
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
    try {
      const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
      const data = await response.json();
      if (data.lat && data.lng) {
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
      const newCoordinatesList: {
        lat: number;
        lng: number;
        _id: string;
        aluguelValor: number;
      }[] = [];
      const bounds = new window.google.maps.LatLngBounds();

      for (const imovel of imoveis) {
        const coords = await getCoordinatesFromCep(imovel.cep);
        if (coords) {
          newCoordinatesList.push({
            ...coords,
            _id: imovel._id,
            aluguelValor: imovel.aluguelValor,
          });

          bounds.extend({ lat: coords.lat, lng: coords.lng });
        }
      }

      setCoordinatesList(newCoordinatesList);
      setMapBounds(bounds);
    };

    if (imoveis.length > 0) {
      fetchCoordinates();
    }
  }, [imoveis]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(
      "Google Maps API Key não encontrada. Verifique o arquivo .env"
    );
    return <p>API Key para Google Maps não encontrada.</p>;
  }

  return (
    <div className="w-full h-full">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          // Ajusta o zoom para cobrir todos os imóveis
          zoom={coordinatesList.length > 1 ? undefined : 16} // Se houver mais de um imóvel, ajusta automaticamente, senão aplica zoom fixo
          center={
            mapBounds
              ? mapBounds.getCenter().toJSON()
              : { lat: -15.7942, lng: -47.8825 } // Brasília como fallback
          }
          options={mapOptions}
          onLoad={(map) => {
            if (mapBounds) {
              map.fitBounds(mapBounds); // Ajusta o zoom e o centro para cobrir todos os imóveis
            }
          }}
        >
          {coordinatesList.map((coords) => (
            <OverlayView
              key={coords._id}
              position={{ lat: coords.lat, lng: coords.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="bg-white text-[#0053f8] p-2 px-6 flex justify-center items-center text-center rounded-lg shadow-lg font-bold text-nowrap">
                R${coords.aluguelValor}
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
