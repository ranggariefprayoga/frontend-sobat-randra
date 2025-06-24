"use client";

import BuatPromoModal from "@/components/BuatProduct/BuatProductPromo";
import CardPromoForAdmin from "@/components/CardProductComponent/CardPromoForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllProductPromos } from "@/lib/api/productPromo.api";
import { ProductPromoResponse } from "@/model/productPromo.model";
import { ArrowLeft } from "lucide-react";

export default function BuatDanUpdatePromoSection() {
  const { data: allProductPromo, isLoading } = useGetAllProductPromos();
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat dan Update Promo" />

      <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
        <BuatPromoModal />
      </div>

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductPromo?.data && allProductPromo.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductPromo.data.map((product: ProductPromoResponse) => (
            <CardPromoForAdmin key={product.id} product={product} customLink={`/admin/layanan/promo/${product.id}`} />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada Promo Bareng Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
