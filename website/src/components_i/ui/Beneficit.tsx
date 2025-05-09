import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Beneficit = () => {
  const [cardAnimationComplete, setCardAnimationComplete] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (inView && !cardAnimationComplete) setCardAnimationComplete(true);

  return (
    <div
      ref={ref}
      className="
        bg-[#F7F7FD] rounded-lg
        w-[90%] md:w-full lg:w-[90%] xl:w-[1245px]
        h-auto flex flex-col lg:flex-row
        my-8 lg:my-24 mx-auto
      "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={cardAnimationComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        /* ▼ borda arredondada + recorte */
        className="w-full h-auto flex justify-center items-center rounded-lg overflow-hidden"
      >
        <img
          src="https://i.postimg.cc/TwV5TbwH/banner-1245x468-latest.png"
          alt="Anúncio"
          className="
            w-full h-auto
            lg:max-w-[1245px]
            aspect-[1245/468]
            object-contain
          "
        />
      </motion.div>
    </div>
  );
};

export default Beneficit;