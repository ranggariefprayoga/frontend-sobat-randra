"use client";

import HeroButtons from "./HeroButtons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white text-black -mt-8 -mb-10">
      <div className="max-w-[1420px] mx-auto">
        <section ref={ref} className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-12 lg:px-24">
          <motion.h1 className="text-3xl md:text-4xl font-bold leading-relaxed mb-2" variants={fadeUp} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.6, delay: 0.2 }}>
            Belajar <span className="bg-red-100 text-red-700 px-2 rounded-md">CPNS</span> Jadi Lebih Gampang di <span className="bg-red-100 text-red-700 px-2 rounded-md">Sobat Randra!</span>
          </motion.h1>

          <motion.div className="mb-4" variants={fadeUp} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.6, delay: 0.3 }}>
            <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto w-75 h-5">
              <path d="M5 15 C40 0, 160 0, 195 15" stroke="#D94B6B" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mb-8" variants={fadeUp} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.6, delay: 0.4 }}>
            Try Out, Bimbel, Smart Book, dan Video Belajar — semua yang kamu butuhin buat lolos CPNS.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.6, delay: 0.6 }}>
            <HeroButtons />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
