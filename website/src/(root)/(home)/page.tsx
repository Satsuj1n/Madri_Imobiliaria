import React from "react";
import Navbar from "../../components_i/ui/Navbar";
import HouseCard from "../../components_i/ui/HouseCard";
import {BrowseProperties} from "components_i/ui/BrowseProperties";
import { Button } from "components_i/ui/Button";


const LandingPage = () => {
  return (
    <>
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center mt-12">
        {/* Coluna Principal com Texto e Navegação */}
        <div className="flex w-full bg-[#F7F7FD]">
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
                <h2 className="font-bold text-[#0053f8] text-[32px]">50k+</h2>
                <p className="text-sm text-gray-500">Inquilinos</p>
              </div>

              {/* Linha entre 50k+ e 10k+ */}
              <div className="h-[64px] w-[3px] bg-[#E0DEF7]"></div>

              <div className="items-start">
                <h2 className="text-[32px] font-bold text-[#0053f8]">10k+</h2>
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
              src="https://i.imgur.com/4vY1EaU.png"
              alt="Imagem do Mapa"
              className="w-full h-auto object-cover "
            />
          </div>
        </div>

        {/* Benefit Section ajustado */}
        <div className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg w-[1120px] h-auto flex my-16">
          {/* Coluna Esquerda com texto e ícones com padding aplicado */}
          <div className="w-1/2 flex flex-col justify-center px-10 py-8">
            {/* Texto do lado esquerdo */}
            <div className="flex flex-col space-y-4">
              <h2
                className="text-[40px] font-bold text-[#100A55]"
                style={{ lineHeight: "56px", letterSpacing: "-0.4px" }}
              >
                A nova maneira de encontrar sua nova casa
              </h2>
              <p className="text-[#000929] text-lg">
                Encontre o lugar dos seus sonhos para morar com mais de 10k+
                propriedades listadas.
              </p>
            </div>

            {/* Ícones e Estatísticas dentro do lado esquerdo */}
            <div className="flex justify-between mt-8">
              {/* Primeiro Item */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.imgur.com/6pZKVEj.png"
                  alt="Icone de porcentagem"
                  className="w-[48px] h-[48px]"
                />
                <h3 className="text-[24px] font-bold text-[#100A55] mt-2">
                  7.4%
                </h3>
                <p className="text-sm text-gray-500">
                  Taxa de Retorno de Propriedade
                </p>
              </div>

              {/* Segundo Item */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.imgur.com/ZRBaMSd.png"
                  alt="Icone de apartamento"
                  className="w-[48px] h-[48px]"
                />
                <h3 className="text-[24px] font-bold text-[#100A55] mt-2">
                  3,856
                </h3>
                <p className="text-sm text-gray-500">
                  Propriedades em Venda e Aluguel
                </p>
              </div>

              {/* Terceiro Item */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.imgur.com/jZz380x.png"
                  alt="Icone de transação"
                  className="w-[48px] h-[48px]"
                />
                <h3 className="text-[24px] font-bold text-[#100A55] mt-2">
                  2,540
                </h3>
                <p className="text-sm text-gray-500">
                  Transações Diárias Completadas
                </p>
              </div>
            </div>

          
          </div>

          <div className="flex ml-36">
            <BrowseProperties />
          </div>

          {/* Imagem do lado direito ocupando metade do box */}
          <div className="w-1/2 h-full flex justify-end items-end">
            <img
              src="https://i.imgur.com/aKr2xVQ.png"
              alt="Ilustração de casa"
              className="w-full h-full object-cover rounded-r-lg"
              style={{ margin: 0 }}
            />
          </div>

          {/* Imagem do lado direito ocupando metade do box */}
          <div className="w-1/2 h-full flex justify-end items-end">
            <img
              src="https://i.imgur.com/aKr2xVQ.png"
              alt="Ilustração de casa"
              className="w-full h-full object-cover rounded-r-lg"
              style={{ margin: 0 }}
            />
          </div>
        </div>

        {/* Seção com fundo azul */}
        <div className="w-full bg-[#021d94] py-10 flex justify-center mt-12">
          <div className="flex flex-col items-center w-[1440px]">
            <h4 className="text-[#A0A3BD] text-[16px] mb-2">Promessa de Não Enviar Spam</h4>
            <h2 className="text-white text-[32px] font-bold mb-4">
              Você é um locador?
            </h2>
            <p className="text-[#A0A3BD] mb-6">
              Descubra maneiras de aumentar o valor da sua propriedade e seja
              listado.
            </p>

            {/* Input e botão utilizando seu componente Button */}
            <div className="flex items-center bg-white rounded-lg shadow-lg w-[543px] h-[80px]">
              <input
                type="email"
                placeholder="Insira seu endereço de e-mail"
                className="w-full h-full pl-4 outline-none rounded-l-lg text-[#100A55]"
              />
              <Button variant="default" size="lg" className="rounded-r-lg mr-4">
                Inscrever-se
              </Button>
            </div>

            <p className="text-[#A0A3BD] mt-4">
              Junte-se a outros locadores na nossa comunidade.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
