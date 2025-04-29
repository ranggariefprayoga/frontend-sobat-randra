"use client";

import LayoutBackgroundRed from "@/layout/LayoutBackgroundRed";
import HeroButtons from "./HeroButtons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <LayoutBackgroundRed>
      <div ref={ref} className="flex flex-col-reverse lg:flex-row items-center px-8 md:px-24 gap-10">
        {/* Teks */}
        <motion.div className="w-full lg:w-1/2 text-white text-center lg:text-left" variants={textVariants} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Perjuangan Jadi Lebih Seru Bareng Sobat Randra!</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">Satu platform lengkap buat kamu yang siap taklukin CPNS, BUMN, dan Polri. Akses Try Out, Bimbel, Smart Book, dan Video Belajar kapan aja, di mana aja.</p>
          <HeroButtons />
        </motion.div>

        {/* Gambar */}
        <motion.div className="w-full lg:w-1/2 flex justify-center lg:justify-end" variants={imageVariants} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}>
          <img src="./logo/logo-bg.jpg" alt="Hero Sobat Randra" className="rounded-full w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96" />
        </motion.div>
      </div>
    </LayoutBackgroundRed>
  );
}
