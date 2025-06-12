/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { Button } from "@/components/ui/button";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useState } from "react";

// Data dummy untuk kategori premium dan gratis
const dummyPremiumProducts = [
  { id: 1, name: "Premium Try Out 1", score: 450 },
  { id: 2, name: "Premium Try Out 2", score: 400 },
];

const dummyGratisProducts: any = [
  { id: 1, name: "Gratis Try Out 1", score: 450 },
  { id: 2, name: "Gratis Try Out 2", score: 400 },
];

export default function HistoryNilaiSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("try-out-gratis");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  let filteredProducts: any[] = [];
  if (selectedCategory === "try-out-premium") {
    filteredProducts = dummyPremiumProducts;
  } else if (selectedCategory === "try-out-gratis") {
    filteredProducts = dummyGratisProducts;
  }

  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="History & Grafik" subTitle="Pengerjaan Try Out kamu!" />

      <div className="w-full px-4 md:px-24 mt-8 grid grid-cols-2 xl:grid-cols-4 gap-2">
        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "try-out-gratis" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("try-out-gratis")}
        >
          Try Out Gratis
        </Button>

        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "try-out-premium" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("try-out-premium")}
        >
          Try Out Premium
        </Button>
      </div>

      <>
        {filteredProducts.length === 0 || !filteredProducts ? (
          <NullComponent message="Belum ada history nilai yang tersedia" color="text-gray-700" />
        ) : (
          <div className="w-full px-4 md:px-24 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product: any) => (
              <div key={product.id} className="card">
                <h3 className="font-bold">{product.name}</h3>
                <p>Nilai: {product.score}</p>
              </div>
            ))}
          </div>
        )}
      </>
    </LayoutBackgroundWhite>
  );
}
