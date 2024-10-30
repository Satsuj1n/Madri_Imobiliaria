import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BrowseProperties from "components_i/ui/BrowseProperties";

const HeroSection = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Hook para detectar quando o componente está na tela
  const { ref, inView } = useInView({
    triggerOnce: true, // Animação ocorre apenas uma vez
    threshold: 0.3, // O componente deve estar 30% visível para começar a animação
  });

  // Disparar a animação quando o componente estiver visível
  if (inView && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <motion.div
      ref={ref} // O componente será observado quando aparecer na tela
      className="flex w-full bg-[#F7F7FD] flex-col md:flex-row pt-20 md:pt-0 md:mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Left Column with Texts and Components */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
        <motion.h1
          className="text-[28px] md:text-[64px] font-bold text-black mb-4 md:ml-36 leading-snug md:leading-[70px] text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={animationTriggered ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Compre, venda ou alugue sua propriedade
        </motion.h1>

        <motion.p
          className="text-[14px] md:text-[20px] text-gray-600 mb-8 md:ml-36 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={animationTriggered ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Uma ótima plataforma para comprar, vender ou até mesmo alugar suas
          propriedades sem qualquer comissão.
        </motion.p>

        {/* Estatísticas para desktop */}
        <motion.div
          className="hidden lg:flex lg:ml-36 space-x-8 items-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
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
        </motion.div>

        {/* Componente BrowseProperties */}
        <motion.div
          className="md:ml-36 relative z-10" // Adicionando z-index para sobrepor a imagem
          initial={{ opacity: 0, scale: 0.9 }}
          animate={animationTriggered ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <BrowseProperties />
        </motion.div>

        {/* Estatísticas para mobile */}
        <motion.div
          className="flex md:hidden w-full justify-between px-8 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-[#0053f8] text-[24px]">50k+</h2>
            <p className="text-sm text-gray-500">Inquilinos</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold text-[#0053f8]">10k+</h2>
            <p className="text-sm text-gray-500">Propriedades</p>
          </div>
        </motion.div>
      </div>

      {/* Right Column with Map as an Image */}
      <motion.div
        className="hidden md:flex w-1/2 justify-center items-center mt-12"
        initial={{ opacity: 0, x: 50 }}
        animate={animationTriggered ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <img
          src="https://i.imgur.com/xjkS3Cu.png"
          alt="Imagem do Mapa"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
