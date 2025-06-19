/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardTryOut from "@/components/CardProductComponent/CardTryOut";
import CardBimbel from "@/components/CardProductComponent/CardBimbel"; // Impor CardBimbel
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { Button } from "@/components/ui/button";
import { LayoutBackgroundImage } from "@/layout/LayoutBackgroundImage";
import { TryOutProductModel } from "@/model/product.model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetTryOutProductsForHome } from "@/lib/api/productTryOut.api";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useGetAllBimbelBarengForHome } from "@/lib/api/productBimbelBareng.api";
import { useGetSmartbookProductsForHome } from "@/lib/api/productSmartbook.api";
import { useGetVideoBelajarProductsForHome } from "@/lib/api/productVideoBelajar.api";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { ProductSmartbookResponse } from "@/model/productSmartbook.model";
import CardSmartbook from "@/components/CardProductComponent/CardSmartbook";
import { ProductVideoBelajarResponse } from "@/model/productVideoBelajar.model";
import CardVideoBelajar from "@/components/CardProductComponent/CardVideoBelajar";

export default function HomeProdukSection() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("try-out");
  const { data: productTryOutForHomePage, isLoading } = useGetTryOutProductsForHome();
  const { data: productBimbelBarengForHomePage, isLoading: isLoadingBimbel } = useGetAllBimbelBarengForHome();
  const { data: productSmartbookForHomePage, isLoading: isLoadingSmartbook } = useGetSmartbookProductsForHome();
  const { data: productVideoBelajarForHomePage, isLoading: isLoadingVideoBelajar } = useGetVideoBelajarProductsForHome();

  if (isLoading || isLoadingBimbel || isLoadingSmartbook || isLoadingVideoBelajar) {
    return (
      <div className="px-4 md:px-24 flex justify-center w-full">
        <LoadingComponent />
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  let filteredProducts: any = [];
  if (selectedCategory === "try-out") {
    filteredProducts = productTryOutForHomePage?.data || [];
  } else if (selectedCategory === "bimbel") {
    filteredProducts = productBimbelBarengForHomePage?.data || [];
  } else if (selectedCategory === "smart-book") {
    filteredProducts = productSmartbookForHomePage?.data || [];
  } else if (selectedCategory === "video-belajar") {
    filteredProducts = productVideoBelajarForHomePage?.data || [];
  }

  return (
    <LayoutBackgroundImage>
      <div className="max-w-[1420px] mx-auto">
        <TitleComponent subTitleColor="text-[#FFA500]" titleColor="text-white" title="Pilihan Paket Belajar" subTitle="Buat kamu pejuang CPNS, BUMN, dan POLRI" textAlign="start" />
        <div className="w-full px-4 md:px-24 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2">
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
            <div className="w-full px-4 md:px-24 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {selectedCategory === "try-out" && filteredProducts.map((product: TryOutProductModel) => <CardTryOut key={product.id} product={product} customLink={`/pilihan-paket/tryout/${product.id}`} />)}
              {selectedCategory === "bimbel" && filteredProducts.map((product: bimbelBarengResponse) => <CardBimbel key={product.id} product={product} customLink={`/pilihan-paket/bimbel/${product.id}`} />)}
              {selectedCategory === "smart-book" && filteredProducts.map((product: ProductSmartbookResponse) => <CardSmartbook key={product.id} product={product} customLink={`/pilihan-paket/smartbook/${product.id}`} />)}
              {selectedCategory === "video-belajar" && filteredProducts.map((product: ProductVideoBelajarResponse) => <CardVideoBelajar key={product.id} product={product} customLink={`/pilihan-paket/video-belajar/${product.id}`} />)}
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
      </div>

      {/* Tombol Kategori */}
    </LayoutBackgroundImage>
  );
}
