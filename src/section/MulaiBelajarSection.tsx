/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import CardBimbel from "@/components/CardProductComponent/CardBimbel";
import CardMulaiTryOut from "@/components/CardProductComponent/CardMulaiTryOut";
import InfoComponent from "@/components/InfoComponent.tsx/InfoComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Button } from "@/components/ui/button";
import { dummyProductBimbel, dummyProductTryOut } from "@/data/dummy/product.home";
import { userDetail } from "@/data/dummy/user.login";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { BimbelProductlModel, TryOutProductModel } from "@/model/product.model";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function MulaiBelajarSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("try-out");
  // backend-api
  const userEmail = userDetail && userDetail.email;
  const userId = userDetail && userDetail.id;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  let filteredProducts: any = [];
  if (selectedCategory === "try-out") {
    // backend-api
    filteredProducts = dummyProductTryOut.filter((product: TryOutProductModel) => product.is_active === true);
  } else if (selectedCategory === "bimbel") {
    // backend-api
    filteredProducts = dummyProductBimbel;
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Produk yang bisa kamu akses" subTitle="Yuk kerjain sekarang!" />
      <div className="w-full px-8 md:px-24 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2">
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
      {selectedCategory === "try-out" || selectedCategory === "bimbel" ? (
        filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="w-full px-8 md:px-24 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {selectedCategory === "try-out" && filteredProducts.map((product: TryOutProductModel) => <CardMulaiTryOut userId={userId} userEmail={userEmail} key={product.id} product={product} />)}
              {selectedCategory === "bimbel" && filteredProducts.map((product: BimbelProductlModel) => <CardBimbel key={product.id} product={product} customLink="/pilihan-paket" />)}
            </div>
          </>
        ) : (
          <NullComponent message="Belum ada produk tersedia" color="text-gray-700" />
        )
      ) : (
        // For Smart-book and Video-Belajar
        <div className="w-full px-8 md:px-24 grid gap-6">
          {selectedCategory === "smart-book" && <InfoComponent message="Silakan cek email kamu jika kamu sudah membeli produk Smart Book, jika produk belum tampil silakan hubungi Admin." color="text-gray-700" />}
          {selectedCategory === "video-belajar" && <InfoComponent message="Silakan cek email kamu jika kamu sudah membeli produk Video Belajar, jika produk belum tampil silakan hubungi Admin." color="text-gray-700" />}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
