"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useGetVideoBelajarProductByIdForAdmin } from "@/lib/api/productVideoBelajar.api";
import UpdateProductVideoBelajarModal from "../Dialog/UpdateVideoBelajarModal";
import DetailVideoBelajar from "@/halaman/PilihanPaket/DetailVideoBelajar";

export default function DetailVideoBelajarForAdmin({ params }: { params: Promise<{ product_video_belajar_id: string }> }) {
  const { product_video_belajar_id: id } = use(params);
  const { data, isLoading } = useGetVideoBelajarProductByIdForAdmin(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      {data?.data && (
        <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
          <UpdateProductVideoBelajarModal initialData={data?.data} />
        </div>
      )}
      <DetailVideoBelajar product={data?.data} />
    </LayoutBackgroundWhite>
  );
}
