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
      className="bg-[#F7F7FD] rounded-lg w-[90%] md:w-full lg:w-[90%] xl:w-[1245px] h-auto flex flex-col lg:flex-row my-8 lg:my-24 mx-auto"
    >
      {/* Adição do anúncio ocupando toda a área */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full h-auto lg:h-[468px] flex justify-center items-center"
      >
        <img
          src="https://i.imgur.com/xsJWtXL.png"
          alt="Anúncio"
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default Beneficit;

