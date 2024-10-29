import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Função para dividir o texto em caracteres
const splitStringUsingRegex = (inputString: string): string[] => {
  const characters: string[] = [];
  const regex = /[\s\S]/g;
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    characters.push(match[0]);
  }
  return characters;
};

const Beneficit = () => {
  const [cardAnimationComplete, setCardAnimationComplete] = useState(false);

  // Hook para detectar quando o componente está na tela
  const { ref, inView } = useInView({
    triggerOnce: true, // Animação ocorre apenas uma vez
    threshold: 0.3, // O componente deve estar 30% visível para começar a animação
  });

  // Texto para o título e o parágrafo
  const heading = "A nova maneira de encontrar sua nova casa";
  const text =
    "Encontre o lugar dos seus sonhos para morar com mais de 10k+ propriedades listadas.";

  // Dividindo os textos em caracteres
  const headingChars = splitStringUsingRegex(heading);
  const textChars = splitStringUsingRegex(text);

  // Disparar a animação quando o componente estiver visível
  if (inView && !cardAnimationComplete) {
    setCardAnimationComplete(true);
  }

  return (
    <div
      ref={ref} // O componente será observado quando aparecer na tela
      className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg w-[90%] md:w-full lg:w-[90%] xl:w-[1120px] h-auto flex flex-col lg:flex-row my-8 lg:my-24 p-4 lg:p-8 mx-auto"
    >
      {/* Left Column with text and icons with padding applied */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 lg:px-10 py-4 lg:py-8">
        <div className="flex flex-col space-y-4">
          {/* Animação de revelação para o título */}
          <motion.h2
            initial="hidden"
            animate={cardAnimationComplete ? "reveal" : "hidden"} // Animação ocorre baseado no cardAnimationComplete
            transition={{ staggerChildren: 0.05 }}
            className="text-2xl lg:text-[40px] font-bold text-[#100A55] leading-snug"
          >
            {headingChars.map((char, index) => (
              <motion.span
                key={index}
                transition={{ duration: 0.5 }}
                variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Animação de revelação para o parágrafo */}
          <motion.p
            initial="hidden"
            animate={cardAnimationComplete ? "reveal" : "hidden"}
            transition={{ staggerChildren: 0.03 }}
            className="text-[#000929] text-base lg:text-lg"
          >
            {textChars.map((char, index) => (
              <motion.span
                key={index}
                transition={{ duration: 0.35 }}
                variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Icons and Statistics within the left side */}
        <div className="flex justify-around mt-8">
          {/* Primeiro bloco com o ícone e as informações */}
          <div className="flex flex-col items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              src="https://i.imgur.com/6pZKVEj.png"
              alt="Icone de porcentagem"
              className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
            />
            <motion.h3
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2"
            >
              {splitStringUsingRegex("7.4%").map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    reveal: { opacity: 1, y: 0 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-xs lg:text-sm text-gray-500 text-center leading-tight"
            >
              {splitStringUsingRegex("Taxa de Retorno de Propriedade").map(
                (char, index) => (
                  <motion.span
                    key={index}
                    transition={{ duration: 0.35 }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      reveal: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </motion.p>
          </div>

          {/* Segundo bloco com o ícone e as informações */}
          <div className="flex flex-col items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              src="https://i.imgur.com/ZRBaMSd.png"
              alt="Icone de apartamento"
              className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
            />
            <motion.h3
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2"
            >
              {splitStringUsingRegex("3,856").map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    reveal: { opacity: 1, y: 0 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-xs lg:text-sm text-gray-500 text-center leading-tight"
            >
              {splitStringUsingRegex("Propriedades em Venda e Aluguel").map(
                (char, index) => (
                  <motion.span
                    key={index}
                    transition={{ duration: 0.35 }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      reveal: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </motion.p>
          </div>

          {/* Terceiro bloco com o ícone e as informações */}
          <div className="flex flex-col items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              src="https://i.imgur.com/jZz380x.png"
              alt="Icone de transação"
              className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
            />
            <motion.h3
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-[20px] lg:text-[24px] font-bold text-[#100A55] mt-2"
            >
              {splitStringUsingRegex("2,540").map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    reveal: { opacity: 1, y: 0 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              initial="hidden"
              animate={cardAnimationComplete ? "reveal" : "hidden"}
              transition={{ staggerChildren: 0.03 }}
              className="text-xs lg:text-sm text-gray-500 text-center leading-tight"
            >
              {splitStringUsingRegex("Transações Diárias Completadas").map(
                (char, index) => (
                  <motion.span
                    key={index}
                    transition={{ duration: 0.35 }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      reveal: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </motion.p>
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
  );
};

export default Beneficit;
