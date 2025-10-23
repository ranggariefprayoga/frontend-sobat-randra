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
import { caraAksesTryOut } from "@/data/cara-akses-to";
import { DialogInfo } from "@/components/Dialog/DialogInfo";

export default function ProductTryOutSection() {
  const { data, isLoading } = useGetAllTryOutProductsExcludeFree();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  const activeProduct = data?.data?.filter((product: TryOutProductModel) => product.is_active === true);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket TryOut" subTitle="Pilihan TryOut Yang Bisa Kamu Beli!" textAlign="start" />
      <div className="px-4 md:px-24 mt-8 flex flex-wrap gap-2">
        <FreeTryOutModalSection />
        {caraAksesTryOut.map((item) => (
          <DialogInfo key={item.title} title={item.title} description={item.description} triggerText={item.trigger} details={item.details} />
        ))}
      </div>

      {!activeProduct || activeProduct.length === 0 ? (
        <NullComponent message="Belum ada TryOut Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {activeProduct.map((product: TryOutProductModel) => (
            <CardTryOut key={product.id} product={product} customLink={`/pilihan-paket/tryout/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
