"use client";

import CardTryOutForAdmin from "@/components/CardProductComponent/CardTryOutForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Button } from "@/components/ui/button";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllTryOutProductsForBuatSoalAdmin } from "@/lib/api/productTryOut.api";
import { TryOutProductModel } from "@/model/product.model";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

function filterTryOutProducts(products: TryOutProductModel[] | undefined, category: "premium" | "gratis"): TryOutProductModel[] {
  if (!products) return [];
  if (category === "premium") {
    return products.filter((product) => product.is_trial_product === false);
  }
  return products.filter((product) => product.is_trial_product === true);
}

export default function BuatSoalTryOutSection() {
  const [selectedCategory, setSelectedCategory] = useState<"premium" | "gratis">("premium");
  const { data: allProductTryOut, isLoading } = useGetAllTryOutProductsForBuatSoalAdmin();

  const handleCategoryClick = (category: "premium" | "gratis") => {
    setSelectedCategory(category);
  };

  const filteredProducts = filterTryOutProducts(allProductTryOut?.data, selectedCategory);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />

      <TitleComponent title="Buat Soal Try Out" />

      <div className="flex gap-4 px-8 md:px-24 mt-4">
        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "premium" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("premium")}
        >
          Premium
        </Button>
        <Button
          variant="outline"
          className={`transition duration-200 ${selectedCategory === "gratis" ? "bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" : "bg-transparent border hover:bg-[#f5f5f5] hover:text-black"}`}
          size="lg"
          onClick={() => handleCategoryClick("gratis")}
        >
          Gratis
        </Button>
      </div>

      {isLoading ? (
        <div className="px-8 md:px-24 flex justify-center w-full mt-8">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-24 mt-8">
          {filteredProducts.map((product: TryOutProductModel) => (
            <CardTryOutForAdmin key={product.id} product={product} customLink={`/admin/tryout/buat-soal/${product.id}`} buttonText="Buat Soal" />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada Try Out Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
