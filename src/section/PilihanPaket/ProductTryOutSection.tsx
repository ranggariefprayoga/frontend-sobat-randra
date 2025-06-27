"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import NullComponent from "@/components/NullComponent/NullComponent";
import { useGetAllTryOutProductsExcludeFree } from "@/lib/api/productTryOut.api";
import { ArrowLeft } from "lucide-react";
import CardTryOut from "@/components/CardProductComponent/CardTryOut";
import { TryOutProductModel } from "@/model/product.model";
import FreeTryOutModalSection from "@/components/Dialog/ModalFreeTryOut";

export default function ProductTryOutSection() {
  const { data, isLoading } = useGetAllTryOutProductsExcludeFree();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket Try Out" subTitle="Pilihan Try Out Yang Bisa Kamu Beli!" textAlign="start" />
      <div className="px-4 md:px-24 mt-8">
        <FreeTryOutModalSection />
      </div>
      {!data?.data || data?.data.length === 0 ? (
        <NullComponent message="Belum ada Try Out Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {data?.data.map((product: TryOutProductModel) => (
            <CardTryOut key={product.id} product={product} customLink={`/pilihan-paket/tryout/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
