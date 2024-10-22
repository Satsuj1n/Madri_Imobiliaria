import HouseCard from "./HouseCard";
import SegmentedControl from "./SegmentedControl";
import SearchBar from "./SearchBar";
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
          className="text-[#6C727F] mt-2 mb-6 md:mt-6 md:mb-16"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Algumas das nossas propriedades selecionadas perto de você.
        </p>
      </div>

      {/* Header with SegmentedControl and SearchBar */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[1120px] mt-4 px-4 mb-4 space-y-2 md:space-y-0">
        <div className="w-full md:w-auto">
          <SegmentedControl />
        </div>
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-[1120px] px-4 mb-14">
        <HouseCard
          aluguelValor="R$2.095/mês"
          titulo="Residencial Teresina"
          endereco="Rua Barroso, 123, Centro"
          cidadeEstado="Teresina, PI"
          quarto={3}
          banheiro={2}
          area={85}
          numero="123"
          bairro="Centro"
          imagemPrincipal="image1.jpg"
          tipo="aluguel"
        />
        <HouseCard
          aluguelValor="R$2.700/mês"
          titulo="Condomínio São Cristóvão"
          endereco="Avenida João XXIII, 456, Zona Leste"
          cidadeEstado="Teresina, PI"
          quarto={4}
          banheiro={2}
          area={120}
          numero="456"
          bairro="Zona Leste"
          imagemPrincipal="image2.jpg"
          tipo="aluguel"
        />
        <HouseCard
          aluguelValor="R$4.550/mês"
          titulo="Casa Luxuosa no Ininga"
          endereco="Rua Francisco de Almeida Neto, Ininga, 789"
          cidadeEstado="Teresina, PI"
          quarto={4}
          banheiro={3}
          area={150}
          numero="789"
          bairro="Ininga"
          imagemPrincipal="image3.jpg"
          tipo="aluguel"
        />
        <HouseCard
          aluguelValor="R$2.400/mês"
          titulo="Residencial Poti Velho"
          endereco="Rua Santa Maria da Codipi, 321, Poti Velho"
          cidadeEstado="Teresina, PI"
          quarto={3}
          banheiro={2}
          area={95}
          numero="321"
          bairro="Poti Velho"
          imagemPrincipal="image4.jpg"
          tipo="aluguel"
        />
        <HouseCard
          aluguelValor="R$1.500/mês"
          titulo="Apartamento Bairro Vermelha"
          endereco="Rua Olavo Bilac, 987, Bairro Vermelha"
          cidadeEstado="Teresina, PI"
          quarto={2}
          banheiro={2}
          area={70}
          numero="987"
          bairro="Bairro Vermelha"
          imagemPrincipal="image5.jpg"
          tipo="aluguel"
        />
        <HouseCard
          aluguelValor="R$1.600/mês"
          titulo="Condomínio Parque Piauí"
          endereco="Rua das Flores, 654, Bairro Parque Piauí"
          cidadeEstado="Teresina, PI"
          quarto={4}
          banheiro={2}
          area={80}
          numero="654"
          bairro="Parque Piauí"
          imagemPrincipal="image6.jpg"
          tipo="aluguel"
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
