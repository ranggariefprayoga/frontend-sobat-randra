/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// import CardMulaiBimbel from "@/components/CardProductComponent/CardMulaiBimbel";
import CardMulaiTryOut from "@/components/CardProductComponent/CardMulaiTryOut";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllBimbelBarengProducts } from "@/lib/api/productBimbelBareng.api";
import { useGetAllTryOutProductsExcludeFree } from "@/lib/api/productTryOut.api";
import { useUser } from "@/lib/api/user.api";
import { TryOutProductModel } from "@/model/product.model";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function MulaiBelajarSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("try-out");

  const { data: allProductTryOut, isLoading } = useGetAllTryOutProductsExcludeFree();
  const { data: allProductBimbelBareng, isLoading: isLoadingBimbelBareng } = useGetAllBimbelBarengProducts();
  const { data: detailUser, isLoading: detailUserLoading } = useUser();

  if (isLoading || detailUserLoading || isLoadingBimbelBareng) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  let filteredProducts: any = [];
  if (selectedCategory === "try-out") {
    filteredProducts = allProductTryOut?.data?.filter((product: TryOutProductModel) => product.is_active) || [];
  } else if (selectedCategory === "bimbel") {
    filteredProducts = allProductBimbelBareng?.data?.filter((product: bimbelBarengResponse) => product.is_active) || [];
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Produk yang bisa kamu akses" subTitle="Yuk belajar sekarang!" />
      <div className="w-full px-4 md:px-24 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "try-out" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("try-out")}
        >
          TryOut
        </Button>

        {/* <Button
          className={`transition duration-200 ${selectedCategory === "bimbel" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("bimbel")}
        >
          Bimbel
        </Button> */}

        <Button
          className={`transition duration-200 ${selectedCategory === "smart-book" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("smart-book")}
        >
          CheatSheet
        </Button>

        {/* <Button
          className={`transition duration-200 ${selectedCategory === "video-belajar" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          variant="outline"
          size="lg"
          onClick={() => handleCategoryClick("video-belajar")}
        >
          Video Belajar
        </Button> */}
      </div>
      {selectedCategory === "try-out" || selectedCategory === "bimbel" ? (
        filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
              {selectedCategory === "try-out" && filteredProducts.map((product: TryOutProductModel) => <CardMulaiTryOut userEmail={detailUser?.data?.email} key={product.id} product={product} />)}
              {/* {selectedCategory === "bimbel" && filteredProducts.map((product: bimbelBarengResponse) => <CardMulaiBimbel key={product.id} product={product} userEmail={detailUser?.data?.email} />)} */}
            </div>
          </>
        ) : (
          <NullComponent message="Belum ada produk tersedia" color="text-gray-700" />
        )
      ) : (
        // For Smart-book and Video-Belajar
        <div className="w-full px-4 md:px-24 grid gap-6">
          {selectedCategory === "smart-book" && (
            <div className="my-4">
              <Alert variant="default" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-blue-50 border-l-4 border-blue-400 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10A8 8 0 11.999 10 8 8 0 0118 10zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                  <AlertTitle className="text-sm font-semibold whitespace-normal">Cek Email Kamu Jika Sudah Membeli CheatSheet</AlertTitle>
                </div>
                <AlertDescription className="text-sm text-gray-700 md:ml-2">Hubungi Admin jika produk belum masuk ke email kamu!.</AlertDescription>
              </Alert>
            </div>
          )}
          {/* {selectedCategory === "video-belajar" && (
            <div className="my-4">
              <Alert variant="default" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-blue-50 border-l-4 border-blue-400 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10A8 8 0 11.999 10 8 8 0 0118 10zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                  <AlertTitle className="text-sm font-semibold whitespace-normal">Cek Email Kamu Jika Sudah Membeli Video Belajar</AlertTitle>
                </div>
                <AlertDescription className="text-sm text-gray-700 md:ml-2">Hubungi Admin jika produk belum masuk ke email kamu!.</AlertDescription>
              </Alert>
            </div>
          )} */}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
