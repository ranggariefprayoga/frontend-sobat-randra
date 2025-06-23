"use client";

import BuatVideoBelajarModal from "@/components/BuatProduct/BuatProductVideoBelajar";
import CardVideoBelajarForAdmin from "@/components/CardProductComponent/CardVideoBelajarForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllVideoBelajarProducts } from "@/lib/api/productVideoBelajar.api";
import { ProductVideoBelajarResponse } from "@/model/productVideoBelajar.model";
import { ArrowLeft } from "lucide-react";

export default function BuatDanUpdateVideoBelajarSection() {
  const { data: allProductVideoBelajar, isLoading } = useGetAllVideoBelajarProducts();
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat dan Update Video Belajar" />

      <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
        <BuatVideoBelajarModal />
      </div>

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductVideoBelajar?.data && allProductVideoBelajar.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductVideoBelajar.data.map((product: ProductVideoBelajarResponse) => (
            <CardVideoBelajarForAdmin key={product.id} product={product} customLink={`/admin/layanan/video/${product.id}`} />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada VideoBelajar Bareng Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
