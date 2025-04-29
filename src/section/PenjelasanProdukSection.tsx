"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import PenjelasanProdukComponent from "@/components/PenjelasanProdukComponent/PenjelasanProdukComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { produkData } from "@/data/penjelasan-produk.data";

export default function PenjelasanProdukSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="Pilihan Paket Belajar" subTitle="Kami menyediakan 4 paket belajar untuk kamu!" textAlign="start" />

      <div ref={ref} className="w-full px-8 md:px-28 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {produkData.map((item, index) => (
            <motion.div key={index} custom={index} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} variants={itemVariants}>
              <PenjelasanProdukComponent key={index} {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </LayoutBackgroundWhite>
  );
}
