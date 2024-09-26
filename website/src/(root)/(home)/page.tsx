import React from "react";
import Navbar from "../../components_i/ui/Navbar";
import HouseCard from "../../components_i/ui/HouseCard";
import BrowseProperties from "components_i/ui/BrowseProperties";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#F7F7FD] ">
        {/* Coluna Esquerda com Textos e Componentes */}
        <div className="w-1/2 flex flex-col justify-center p-10">
          <h1 className="text-[64px] font-bold text-black mb-4 ml-36 leading-[70px]">
            Compre, venda ou alugue sua propriedade
          </h1>
          <p className="text-[20px] text-gray-600 mb-8 ml-36">
            Uma ótima plataforma para comprar, vender ou até mesmo alugar suas
            propriedades sem qualquer comissão.
          </p>

          {/* Novo div para os elementos 50k+ e 10k+ com linhas de separação */}
          <div className="flex ml-36 space-x-8 items-center mb-8">
            {/* Linha antes do 50k+ */}
            <div className="h-[64px] w-[3px] bg-[#E0DEF7]"></div>

            <div className="items-start">
              <h2 className="font-bold text-[#7065F0] text-[32px]">50k+</h2>
              <p className="text-sm text-gray-500">Inquilinos</p>
            </div>

            {/* Linha entre 50k+ e 10k+ */}
            <div className="h-[64px] w-[3px] bg-[#E0DEF7]"></div>

            <div className="items-start">
              <h2 className="text-[32px] font-bold text-[#7065F0]">10k+</h2>
              <p className="text-sm text-gray-500">Propriedades</p>
            </div>

          
          </div>

          <div className="flex ml-36">
            <BrowseProperties />
          </div>
        </div>

        {/* Coluna Direita com o Mapa como uma Imagem */}
        <div className="w-[60%] flex justify-center items-center mt-12">
          <img
            src="https://i.imgur.com/k9dwT5R.png"
            alt="Imagem do Mapa"
            className="w-full h-auto object-cover "
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
