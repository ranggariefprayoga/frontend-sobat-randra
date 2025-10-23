"use client";

import CardTryOutForAdmin from "@/components/CardProductComponent/CardTryOutForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllTryOutProducts } from "@/lib/api/productTryOut.api";
import { TryOutProductModel } from "@/model/product.model";
import { ArrowLeft } from "lucide-react";

export default function TambahkanAksesTryOutSection() {
  const { data: allProductTryOut, isLoading } = useGetAllTryOutProducts();
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Tambahkan Akses TryOut" />

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductTryOut?.data && allProductTryOut.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductTryOut.data.map((product: TryOutProductModel) => (
            <CardTryOutForAdmin key={product.id} product={product} customLink={`/admin/tryout/akses/${product.id}`} buttonText="Tambahkan Akses" />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada TryOut Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
