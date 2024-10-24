import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(
      "Google Maps API Key não encontrada. Verifique o arquivo .env"
    );
    return <p>API Key para Google Maps não encontrada.</p>;
  }

  const mapOptions = {
    disableDefaultUI: true, // Remove todos os controles
    zoomControl: false, // Remove o controle de zoom
    streetViewControl: false, // Remove o boneco de street view
    fullscreenControl: false, // Remove o botão de tela cheia
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
    ], // Estilos para esconder todos os textos e marcadores
  };

  return (
    <div className="w-full h-full">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
          options={mapOptions} // Aplicar as opções customizadas
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
