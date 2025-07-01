"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import NullComponent from "@/components/NullComponent/NullComponent";
import { ArrowLeft } from "lucide-react";
import { useGetAllVideoBelajarProducts } from "@/lib/api/productVideoBelajar.api";
import CardVideoBelajar from "@/components/CardProductComponent/CardVideoBelajar";
import { ProductVideoBelajarResponse } from "@/model/productVideoBelajar.model";

export default function ProductVideoBelajarSection() {
  const { data, isLoading } = useGetAllVideoBelajarProducts();

  if (isLoading) {
    return <LoadingComponent color="#ad0a1f" />;
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Paket Video Belajar" subTitle="Pilihan Video Belajar Buat Kamu!" textAlign="start" />
      {!data?.data || data?.data.length === 0 ? (
        <NullComponent message="Belum ada Video Belajar Tersedia" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 md:px-24 mt-8">
          {data?.data.map((product: ProductVideoBelajarResponse) => (
            <CardVideoBelajar key={product.id} product={product} customLink={`/pilihan-paket/video-belajar/${product.id}`} />
          ))}
        </div>
      )}
    </LayoutBackgroundWhite>
  );
}
