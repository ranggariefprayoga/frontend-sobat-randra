"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetVideoBelajarProductByIdForUser } from "@/lib/api/productVideoBelajar.api";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import DetailVideoBelajar from "./DetailVideoBelajar";

export default function DetailPilihanPaketVideoBelajarForUser({ params }: { params: Promise<{ product_video_belajar_id: string }> }) {
  const { product_video_belajar_id: id } = use(params);
  const { data, isLoading } = useGetVideoBelajarProductByIdForUser(Number(id));

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
      <DetailVideoBelajar product={data?.data} />
    </LayoutBackgroundWhite>
  );
}
