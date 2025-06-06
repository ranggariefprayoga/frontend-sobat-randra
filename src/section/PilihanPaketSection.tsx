/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import CardBimbel from "@/components/CardProductComponent/CardBimbel";
import CardTryOut from "@/components/CardProductComponent/CardTryOut";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Button } from "@/components/ui/button";
import { dummyProductBimbel } from "@/data/dummy/product.home";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllFreeTryOutProductsForUser, useGetAllTryOutProductsExcludeFree } from "@/lib/api/productTryOut.api";
import { BimbelProductlModel, TryOutProductModel } from "@/model/product.model";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PilihanPaketSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("try-out");
  const router = useRouter();

  const { data: allProductTryOut, isLoading } = useGetAllTryOutProductsExcludeFree();
  const { data: allFreeProductTryOutForUser, isLoading: isLoadingFreeProductTryOut } = useGetAllFreeTryOutProductsForUser();

  if (isLoading || isLoadingFreeProductTryOut) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  const freeProductTryOut = allFreeProductTryOutForUser?.data?.[0] ?? null;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToFreeTryOut = () => {
    if (!freeProductTryOut) {
      return;
    }
    const id = freeProductTryOut.id;
    router.push(`/pilihan-paket/tryout-gratis/${id}`);
  };

  let filteredProducts: any = [];
  if (selectedCategory === "try-out") {
    filteredProducts = allProductTryOut?.data || [];
  } else if (selectedCategory === "bimbel") {
    filteredProducts = dummyProductBimbel;
  } else if (selectedCategory === "smart-book") {
    filteredProducts = [];
  } else if (selectedCategory === "video-belajar") {
    filteredProducts = [];
  }
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Pilihan Paket" subTitle="Tersedia 4 paket belajar untuk kamu!" />
      {freeProductTryOut && freeProductTryOut.is_active && (
        <div className="px-8 md:px-24 py-4">
          <div className="w-full p-4 md:p-8  bg-[#ad0a1f] max-w-[1280px] mx-auto rounded-md">
            <h3 className="text-white font-semibold text-base">Belum Pernah Cobain Try Out?</h3>
            <Button variant={"outline"} className="mt-4 text-sm" onClick={handleToFreeTryOut}>
              Disini Detail Uji Coba Gratis!
            </Button>
          </div>
        </div>
      )}
      <div className="w-full px-8 md:px-24 mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "try-out" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("try-out")}
        >
          Try Out
        </Button>

        <Button
          className={`transition duration-200 ${selectedCategory === "bimbel" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("bimbel")}
        >
          Bimbel
        </Button>

        <Button
          className={`transition duration-200 ${selectedCategory === "smart-book" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("smart-book")}
        >
          Smart Book
        </Button>

        <Button
          className={`transition duration-200 ${selectedCategory === "video-belajar" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("video-belajar")}
        >
          Video Belajar
        </Button>
      </div>
      {filteredProducts && filteredProducts.length > 0 ? (
        <>
          <div className="w-full px-8 md:px-24 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {selectedCategory === "try-out" && filteredProducts.map((product: TryOutProductModel) => <CardTryOut key={product.id} product={product} customLink={`/pilihan-paket/tryout/${product.id}`} />)}
            {selectedCategory === "bimbel" && filteredProducts.map((product: BimbelProductlModel) => <CardBimbel key={product.id} product={product} customLink="/pilihan-paket" />)}
          </div>
        </>
      ) : (
        <NullComponent message="Produk Belum Tersedia" color="text-black" />
      )}
    </LayoutBackgroundWhite>
  );
}
