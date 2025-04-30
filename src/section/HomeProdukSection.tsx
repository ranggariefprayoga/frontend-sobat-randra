/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardTryOut from "@/components/CardProductComponent/CardTryOut";
import CardBimbel from "@/components/CardProductComponent/CardBimbel"; // Impor CardBimbel
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { Button } from "@/components/ui/button";
import { dummyProductBimbel, dummyProductTryOut } from "@/data/dummy/product.home";
import { LayoutBackgroundImage } from "@/layout/LayoutBackgroundImage";
import { BimbelProductlModel, TryOutProductModel } from "@/model/product.model";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeProdukSection() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("try-out");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  let filteredProducts: any = [];
  if (selectedCategory === "try-out") {
    filteredProducts = dummyProductTryOut;
  } else if (selectedCategory === "bimbel") {
    filteredProducts = dummyProductBimbel;
  } else if (selectedCategory === "smart-book") {
    filteredProducts = []; // Produk Smart Book (ganti dengan data produk smart book)
  } else if (selectedCategory === "video-belajar") {
    filteredProducts = []; // Produk Video Belajar (ganti dengan data produk video belajar)
  }

  return (
    <LayoutBackgroundImage>
      <TitleComponent subTitleColor="text-[#FFA500]" titleColor="text-white" title="Pilihan Paket Belajar" subTitle="Buat kamu pejuang CPNS, BUMN, dan POLRI" textAlign="start" />

      {/* Tombol Kategori */}
      <div className="w-full px-8 md:px-28 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Button
          className={`transition duration-200 ${selectedCategory === "try-out" ? "bg-white text-black hover:bg-[#f5f5f5]" : "bg-transparent border hover:bg-white hover:text-black"}`}
          variant="default"
          size="lg"
          onClick={() => handleCategoryClick("try-out")}
        >
          Try Out
        </Button>
        <Button
          className={`transition duration-200 ${selectedCategory === "bimbel" ? "bg-white text-black hover:bg-[#f5f5f5]" : "bg-transparent border hover:bg-white hover:text-black"}`}
          variant="default"
          size="lg"
          onClick={() => handleCategoryClick("bimbel")}
        >
          Bimbel
        </Button>
        <Button
          className={`transition duration-200 ${selectedCategory === "smart-book" ? "bg-white text-black hover:bg-[#f5f5f5]" : "bg-transparent border hover:bg-white hover:text-black"}`}
          variant="default"
          size="lg"
          onClick={() => handleCategoryClick("smart-book")}
        >
          Smart Book
        </Button>
        <Button
          className={`transition duration-200 ${selectedCategory === "video-belajar" ? "bg-white text-black hover:bg-[#f5f5f5]" : "bg-transparent border hover:bg-white hover:text-black"}`}
          variant="default"
          size="lg"
          onClick={() => handleCategoryClick("video-belajar")}
        >
          Video Belajar
        </Button>
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <>
          <div className="w-full px-8 md:px-28 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {selectedCategory === "try-out" && filteredProducts.map((product: TryOutProductModel) => <CardTryOut key={product.id} product={product} customLink="/pilihan-paket" />)}
            {selectedCategory === "bimbel" && filteredProducts.map((product: BimbelProductlModel) => <CardBimbel key={product.id} product={product} customLink="/pilihan-paket" />)}
            {/* Tambahkan komponen lain seperti SmartBook atau VideoBelajar jika datanya ada */}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => router.push("/pilihan-paket")} variant="default" className="bg-white text-[#ad0a1f] hover:bg-[#f5f5f5] hover:text-[#d7263d] cursor-pointer">
              Lihat Semua Paket Belajar
            </Button>
          </div>
        </>
      ) : (
        <NullComponent message="Belum ada produk tersedia" color="text-white" />
      )}
    </LayoutBackgroundImage>
  );
}
