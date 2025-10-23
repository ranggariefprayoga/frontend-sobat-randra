"use client";

import CreateTryOutFreeModal from "@/components/BuatProduct/BuatProductTryOutGratis";
import CardTryOutForAdmin from "@/components/CardProductComponent/CardTryOutForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllFreeTryOutProducts } from "@/lib/api/productTryOut.api";
import { TryOutProductModel } from "@/model/product.model";
import { ArrowLeft } from "lucide-react";

export default function BuatDanUpdateTryOutGratisSection() {
  const { data: allFreeProductTryOut, isLoading } = useGetAllFreeTryOutProducts();

  const checkFreeProduct = () => {
    if (allFreeProductTryOut?.data && allFreeProductTryOut.data.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat dan Update TryOut Gratis" />
      <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
        <CreateTryOutFreeModal checkFreeProduct={checkFreeProduct()} />
      </div>

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allFreeProductTryOut?.data && allFreeProductTryOut.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allFreeProductTryOut.data.map((product: TryOutProductModel) => (
            <CardTryOutForAdmin key={product.id} product={product} customLink={`/admin/layanan/tryout-gratis/${product.id}`} />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada TryOut Gratis Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
