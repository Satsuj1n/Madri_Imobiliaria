import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Beneficit = () => {
  const [cardAnimationComplete, setCardAnimationComplete] = useState(false);

  // Hook para detectar quando o componente está visível na tela
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Disparar a animação quando o componente estiver visível
  if (inView && !cardAnimationComplete) {
    setCardAnimationComplete(true);
  }

  return (
    <div
      ref={ref}
      className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg w-[90%] md:w-full lg:w-[90%] xl:w-[1120px] h-auto flex flex-col lg:flex-row my-8 lg:my-24 p-4 lg:p-8 mx-auto"
    >
      {/* Adição do anúncio ocupando toda a área */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full h-auto lg:h-[400px] flex justify-center items-center"
      >
        <img
          src="https://via.placeholder.com/1120x400?text=Seu+Anúncio+Aqui"
          alt="Anúncio"
          className="w-full h-auto object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default Beneficit;
