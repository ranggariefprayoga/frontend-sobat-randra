"use client";

import BuatSmartbookModal from "@/components/BuatProduct/BuatProductSmartbook";
import CardSmartbookForAdmin from "@/components/CardProductComponent/CardSmartbookForAdmin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetAllSmartbookProducts } from "@/lib/api/productSmartbook.api";
import { ProductSmartbookResponse } from "@/model/productSmartbook.model";
import { ArrowLeft } from "lucide-react";

export default function BuatDanUpdateSmartbookSection() {
  const { data: allProductSmartbook, isLoading } = useGetAllSmartbookProducts();
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat dan Update Smartbook" />

      <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
        <BuatSmartbookModal />
      </div>

      {isLoading ? (
        <div className="px-4 md:px-24 flex justify-center w-full">
          <LoadingComponent color="#ad0a1f" />
        </div>
      ) : allProductSmartbook?.data && allProductSmartbook.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-24 mt-4">
          {allProductSmartbook.data.map((product: ProductSmartbookResponse) => (
            <CardSmartbookForAdmin key={product.id} product={product} customLink={`/admin/layanan/smartbook/${product.id}`} />
          ))}
        </div>
      ) : (
        <NullComponent message="Belum ada Smartbook Bareng Tersedia" />
      )}
    </LayoutBackgroundWhite>
  );
}
