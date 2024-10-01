import React from "react";
import HouseCard from "./HouseCard"; // Adjust the path according to your project structure
import SegmentedControl from "./SegmentedControl"; // Adjust the path according to your project structure
import SearchBar from "./SearchBar"; // Adjust the path according to your project structure
import { Button } from "./Button";

const PropertyListing = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Title and Subtitle Text */}
      <div className="text-center mt-8">
        <h2
          className="text-[#000929] font-bold"
          style={{
            fontSize: "48px",
            lineHeight: "56px",
            letterSpacing: "-0.4px",
          }}
        >
          Baseado na sua localização
        </h2>
        <p
          className="text-[#6C727F] mb-16 mt-6"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Algumas das nossas propriedades selecionadas perto de você.
        </p>
      </div>

      {/* Header with SegmentedControl and SearchBar */}
      <div className="flex justify-between w-full max-w-[1120px] mt-8 px-4 mb-4">
        <SegmentedControl />
        <SearchBar />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-14">
        <HouseCard
          price="R$2.095/mês"
          name="Residencial Teresina"
          location="Rua Barroso"
          city="Teresina, PI"
          beds={3}
          baths={2}
          size="85m²"
          image="https://i.imgur.com/ZFqP0Aw.jpeg"
        />
        <HouseCard
          price="R$2.700/mês"
          name="Condomínio São Cristóvão"
          location="Avenida João XXIII"
          city="Teresina, PI"
          beds={4}
          baths={2}
          size="120m²"
          image="https://cdn.imoview.com.br/torreurbanismo/Imoveis/327/rpg0w-whatsapp-image-2024-05-07-at-173749-1715115323.jpeg?1715115323"
        />
        <HouseCard
          price="R$4.550/mês"
          name="Casa Luxuosa no Ininga"
          location="Rua Francisco de Almeida Neto, Ininga"
          city="Teresina, PI"
          beds={4}
          baths={3}
          size="150m²"
          image="https://media.istockphoto.com/id/1294620492/pt/foto/3d-rendering-of-modern-house-in-luxurious-style-in-evening.jpg?s=2048x2048&w=is&k=20&c=PrTyjFn5YVUAXl9_-_5uYYkMyB_PgxunMXRtWSpe3os="
        />
        <HouseCard
          price="R$2.400/mês"
          name="Residencial Poti Velho"
          location="Rua Santa Maria da Codipi, Poti Velho"
          city="Teresina, PI"
          beds={3}
          baths={2}
          size="95m²"
          image="https://i.imgur.com/Z18jPaq.png"
        />
        <HouseCard
          price="R$1.500/mês"
          name="Apartamento Bairro Vermelha"
          location="Rua Olavo Bilac, Bairro Vermelha"
          city="Teresina, PI"
          beds={2}
          baths={2}
          size="70m²"
          image="https://cdn.imoview.com.br/torreurbanismo/Imoveis/672/r2el2-whatsapp-image-2024-09-03-at-105811-1725373790.jpeg?1725373790"
        />
        <HouseCard
          price="R$1.600/mês"
          name="Condomínio Parque Piauí"
          location="Rua das Flores, Bairro Parque Piauí"
          city="Teresina, PI"
          beds={4}
          baths={2}
          size="80m²"
          image="https://i.imgur.com/9bs7CpV.png"
        />
      </div>
      <div className="mb-28">
        <Button variant="large" size="large">
            Ver Mais Propriedades
        </Button>
      </div>
    </div>
  );
};

export default PropertyListing;
