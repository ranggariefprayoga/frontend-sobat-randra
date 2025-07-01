"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import NullComponent from "@/components/NullComponent/NullComponent";
import { ArrowLeft } from "lucide-react";
import { useGetAllProductPromos } from "@/lib/api/productPromo.api";
import { ProductPromoResponse } from "@/model/productPromo.model";
import CardPromo from "@/components/CardProductComponent/CardPromo";

export default function ProductPromoSection() {
  const { data, isLoading } = useGetAllProductPromos();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  const activeProduct = data?.data?.filter((product: ProductPromoResponse) => product.is_active === true);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket Promo" subTitle="Pilihan Promo Buat Kamu!" textAlign="start" />
      {!activeProduct || activeProduct.length === 0 ? (
        <NullComponent message="Belum ada Promo Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {activeProduct.map((product: ProductPromoResponse) => (
            <CardPromo key={product.id} product={product} customLink={`/pilihan-paket/promo/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
