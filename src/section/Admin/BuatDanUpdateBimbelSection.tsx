"use client";

import BuatBimbelBarengModal from "@/components/BuatProduct/BuatProductBimbelBareng";
import CardBimbelBarengForAdmin from "@/components/CardProductComponent/CardBimbelBarengForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllBimbelBarengProducts } from "@/lib/api/productBimbelBareng.api";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { ArrowLeft } from "lucide-react";

export default function BuatDanUpdateBimbelSection() {
  const { data: allProductBimbel, isLoading } = useGetAllBimbelBarengProducts();

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat dan Update Bimbel Bareng" />
      <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
        <BuatBimbelBarengModal />
      </div>

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductBimbel?.data && allProductBimbel.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductBimbel.data.map((product: bimbelBarengResponse) => (
            <CardBimbelBarengForAdmin key={product.id} product={product} customLink={`/admin/layanan/bimbel/${product.id}`} />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada Bimbel Bareng Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
