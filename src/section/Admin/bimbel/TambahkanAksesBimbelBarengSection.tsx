"use client";

import CardBimbelBarengForAdmin from "@/components/CardProductComponent/CardBimbelBarengForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllBimbelBarengProducts } from "@/lib/api/productBimbelBareng.api";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { ArrowLeft } from "lucide-react";

export default function TambahkanAksesBimbelBarengSection() {
  const { data: allProductTryOut, isLoading } = useGetAllBimbelBarengProducts();
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Tambahkan Akses Bimbel Bareng" />
      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductTryOut?.data && allProductTryOut.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductTryOut.data.map((product: bimbelBarengResponse) => (
            <CardBimbelBarengForAdmin key={product.id} product={product} customLink={`/admin/bimbel/akses/${product.id}`} buttonText="Tambahkan Akses" />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada Bimbel Bareng Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
