import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Beneficit = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Captura a posição de scroll em relação ao componente
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 99%", "end start"], // A animação começa mais cedo
  });

  // Transforma o scroll progress em movimento no eixo X (da esquerda para o centro)
  const xTransform = useTransform(scrollYProgress, [0, 0.6], ["-100vw", "0vw"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Adicionando suavidade à animação com 'spring'
  const transition = {
    type: "spring", // Animação de mola
    stiffness: 50,  // Rigidez da mola (menor valor é mais suave)
    damping: 15,    // Amortecimento (maior valor para menos oscilação)
  };

  return (
    <motion.div
      ref={targetRef}
      style={{
        x: xTransform, // Movimenta o componente de acordo com o scroll
        opacity: opacityTransform, // Ajusta a opacidade de acordo com o scroll
      }}
      transition={transition} // Aplicando a transição
      className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg w-[90%] md:w-full lg:w-[90%] xl:w-[1120px] h-auto flex flex-col lg:flex-row my-8 lg:my-24 p-4 lg:p-8 mx-auto"
    >
      {/* Left Column with text and icons with padding applied */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 lg:px-10 py-4 lg:py-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl lg:text-[40px] font-bold text-[#100A55] leading-snug">
            A nova maneira de encontrar sua nova casa
          </h2>
          <p className="text-[#000929] text-base lg:text-lg">
            Encontre o lugar dos seus sonhos para morar com mais de 10k+ propriedades listadas.
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
    </motion.div>
  );
};

export default Beneficit;
