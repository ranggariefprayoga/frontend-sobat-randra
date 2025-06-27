"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import LayoutContent from "@/layout/LayoutContent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { caraBeliData } from "@/data/cara-beli.data";
import { motion } from "framer-motion";

export default function CaraBeliSection() {
  const half = Math.ceil(caraBeliData.length / 2);
  const leftColumn = caraBeliData.slice(0, half);
  const rightColumn = caraBeliData.slice(half);

  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="FAQ" subTitle="Pertanyaan yang sering ditanyakan" />
      <LayoutContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 md:mb-16">
          {[leftColumn, rightColumn].map((columnData, colIndex) => (
            <Accordion key={colIndex} type="single" collapsible className="flex flex-col gap-4">
              {columnData.map((item, index) => (
                <AccordionItem key={index} value={`item-${colIndex}-${index}`} className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-left text-sm md:text-base font-medium bg-transparent hover:bg-gray-100 transition">
                    <div className="flex items-center gap-2 group">
                      {item.icon && (
                        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} whileHover={{ rotate: 12 }} className="bg-red-200/50 p-2 rounded-full transition-transform">
                          {item.icon}
                        </motion.div>
                      )}
                      <span>{item.trigger}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
                    <p className="mb-2 whitespace-pre-line">{item.description}</p>
                    {item.details && item.details.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </LayoutContent>
    </LayoutBackgroundWhite>
  );
}
