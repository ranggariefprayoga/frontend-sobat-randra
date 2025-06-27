"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface TitleComponentProps {
  subTitle?: string;
  title: string;
  textAlign?: "center" | "start";
  subTitleColor?: string;
  titleColor?: string;
}

const TitleComponent = ({ subTitle, title, textAlign = "center", subTitleColor = "text-red-700", titleColor = "text-black" }: TitleComponentProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const alignmentClass = textAlign === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div ref={ref} className={`w-full px-4 md:px-24 text-black flex flex-col gap-2 ${alignmentClass}`}>
      <motion.h3 variants={titleVariants} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }} className={`text-2xl md:text-3xl font-bold  ${titleColor}`}>
        {title}
      </motion.h3>
      {subTitle && (
        <motion.h3
          variants={titleVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-base md:text-lg font-bold tracking-widest bg-red-100 px-2 rounded-md ${subTitleColor}`}
        >
          {subTitle}
        </motion.h3>
      )}
    </div>
  );
};

export default TitleComponent;
