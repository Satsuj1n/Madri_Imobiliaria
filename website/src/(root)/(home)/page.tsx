import React from "react";
import Navbar from "../../components_i/ui/Navbar";
import HouseCard from "../../components_i/ui/HouseCard";
import BrowseProperties from "components_i/ui/BrowseProperties";
import { Button } from "components_i/ui/Button";
import PropertyListing from "components_i/ui/PropertyListing";
import Footer from "components_i/ui/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="flex min-h-screen flex-col items-center overflow-x-hidden">
        {/* Main Column with Text and Navigation */}
        <div className="flex w-full bg-[#F7F7FD] flex-col md:flex-row pt-20 md:pt-0">
          {/* Left Column with Texts and Components */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
            <h1 className="text-[28px] md:text-[64px] font-bold text-black mb-4 md:ml-36 leading-snug md:leading-[70px] text-center md:text-left">
              Compre, venda ou alugue sua propriedade
            </h1>
            <p className="text-[14px] md:text-[20px] text-gray-600 mb-8 md:ml-36 text-center md:text-left">
              Uma ótima plataforma para comprar, vender ou até mesmo alugar suas
              propriedades sem qualquer comissão.
            </p>

            {/* Estatísticas para desktop, visíveis na resolução padrão e ocultas no mobile */}
            <div className="hidden lg:flex lg:ml-36 space-x-8 items-center mb-8">
              <div className="h-[64px] w-[3px] bg-[#E0DEF7]"></div>
              <div className="items-start">
                <h2 className="font-bold text-[#0053f8] text-[24px] md:text-[32px]">
                  50k+
                </h2>
                <p className="text-sm text-gray-500">Inquilinos</p>
              </div>
              <div className="h-[64px] w-[3px] bg-[#E0DEF7]"></div>
              <div className="items-start">
                <h2 className="text-[24px] md:text-[32px] font-bold text-[#0053f8]">
                  10k+
                </h2>
                <p className="text-sm text-gray-500">Propriedades</p>
              </div>
            </div>

            {/* Componente BrowseProperties, ajustado para versão mobile e desktop */}
            <div className="md:ml-36">
              <BrowseProperties />
            </div>

            {/* Estatísticas para mobile, posicionadas abaixo do BrowseProperties */}
            <div className="flex md:hidden w-full justify-between px-8 mt-4">
              <div className="flex flex-col items-center">
                <h2 className="font-bold text-[#0053f8] text-[24px]">50k+</h2>
                <p className="text-sm text-gray-500">Inquilinos</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[24px] font-bold text-[#0053f8]">10k+</h2>
                <p className="text-sm text-gray-500">Propriedades</p>
              </div>
            </div>
          </div>

          {/* Right Column with Map as an Image, hidden on mobile */}
          <div className="hidden md:flex w-1/2 justify-center items-center mt-12">
            <img
              src="https://i.imgur.com/xjkS3Cu.png"
              alt="Imagem do Mapa"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Adjusted Benefit Section */}
        <div className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg w-[90%] md:w-full lg:w-[90%] xl:w-[1120px] h-auto flex flex-col lg:flex-row my-8 lg:my-24 p-4 lg:p-8 mx-auto">
          {/* Left Column with text and icons with padding applied */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 lg:px-10 py-4 lg:py-8">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl lg:text-[40px] font-bold text-[#100A55] leading-snug">
                A nova maneira de encontrar sua nova casa
              </h2>
              <p className="text-[#000929] text-base lg:text-lg">
                Encontre o lugar dos seus sonhos para morar com mais de 10k+
                propriedades listadas.
              </p>
            </div>

            {/* Icons and Statistics within the left side */}
            <div className="flex justify-around mt-8">
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imgur.com/6pZKVEj.png"
                  alt="Icone de porcentagem"
                  className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
                />
                <h3 className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2">
                  7.4%
                </h3>
                <p className="text-xs lg:text-sm text-gray-500 text-center leading-tight">
                  Taxa de Retorno de Propriedade
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="https://i.imgur.com/ZRBaMSd.png"
                  alt="Icone de apartamento"
                  className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
                />
                <h3 className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2">
                  3,856
                </h3>
                <p className="text-xs lg:text-sm text-gray-500 text-center leading-tight">
                  Propriedades em Venda e Aluguel
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="https://i.imgur.com/jZz380x.png"
                  alt="Icone de transação"
                  className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
                />
                <h3 className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2">
                  2,540
                </h3>
                <p className="text-xs lg:text-sm text-gray-500 text-center leading-tight">
                  Transações Diárias Completadas
                </p>
              </div>
            </div>
          </div>

          {/* Image occupying half the box on the right side */}
          <div className="w-full lg:w-1/2 h-full flex justify-end items-end mt-4 lg:mt-0">
            <img
              src="https://i.imgur.com/aKr2xVQ.png"
              alt="Ilustração de casa"
              className="w-full h-auto lg:h-full object-cover rounded-r-lg"
            />
          </div>
        </div>

        {/* Apply the background for the Property Listing section */}
        <div className="w-full bg-gradient-to-b from-white to-[#e7ecfd] px-4 lg:px-0">
          <PropertyListing />
        </div>

        {/* Blue section */}
        <div className="w-full bg-[#02166c] py-10 flex justify-center px-4">
          <div className="flex flex-col items-center w-full lg:w-[80%] xl:w-[1440px]">
            <h4 className="text-[#A0A3BD] text-[14px] lg:text-[16px] mb-2">
              No Spam Promise
            </h4>
            <h2 className="text-white text-2xl lg:text-[32px] font-bold mb-4">
              Você é um locador?
            </h2>
            <p className="text-[#A0A3BD] mb-6 text-center text-sm lg:text-base">
              Descubra maneiras de aumentar o valor da sua propriedade e seja
              listado. Sem Spam.
            </p>

            <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg w-full sm:w-[400px] lg:w-[543px] h-[80px]">
              <input
                type="email"
                placeholder="Insira seu endereço de e-mail"
                className="w-full h-full pl-4 outline-none rounded-l-lg text-[#100A55] sm:rounded-none"
              />
              <Button
                variant="default"
                size="lg"
                className="rounded-r-lg w-full sm:w-auto"
              >
                Inscrever-se
              </Button>
            </div>

            <p className="text-[#A0A3BD] mt-4 text-center">
              Junte-se a mais de 10.000+ outros locadores na nossa comunidade.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
