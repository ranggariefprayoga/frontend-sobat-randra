"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import NullComponent from "@/components/NullComponent/NullComponent";
import { ArrowLeft } from "lucide-react";
import { useGetAllBimbelBarengProducts } from "@/lib/api/productBimbelBareng.api";
import CardBimbel from "@/components/CardProductComponent/CardBimbel";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";

export default function ProductBimbelSection() {
  const { data, isLoading } = useGetAllBimbelBarengProducts();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  const activeProduct = data?.data?.filter((product: bimbelBarengResponse) => product.is_active === true);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket Bimbel" subTitle="Pilihan Bimbel Yang Bisa Kamu Beli!" textAlign="start" />
      {!activeProduct || activeProduct.length === 0 ? (
        <NullComponent message="Belum ada Bimbel Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {activeProduct.map((product: bimbelBarengResponse) => (
            <CardBimbel key={product.id} product={product} customLink={`/pilihan-paket/bimbel/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
