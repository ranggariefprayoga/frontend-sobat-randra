"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import NullComponent from "@/components/NullComponent/NullComponent";
import { ArrowLeft } from "lucide-react";
import { ProductSmartbookResponse } from "@/model/productSmartbook.model";
import CardSmartbook from "@/components/CardProductComponent/CardSmartbook";
import { useGetAllSmartbookProducts } from "@/lib/api/productSmartbook.api";

export default function ProductSmartbookSection() {
  const { data, isLoading } = useGetAllSmartbookProducts();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  const activeProduct = data?.data?.filter((product: ProductSmartbookResponse) => product.is_active === true);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket CheatSheet" subTitle="Pilihan CheatSheet Buat Kamu!" textAlign="start" />
      {!activeProduct || activeProduct.length === 0 ? (
        <NullComponent message="Belum ada CheatSheet Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {activeProduct.map((product: ProductSmartbookResponse) => (
            <CardSmartbook key={product.id} product={product} customLink={`/pilihan-paket/smartbook/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
