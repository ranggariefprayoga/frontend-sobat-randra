"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

import DetailPromo from "@/pages/PilihanPaket/DetailPromo";
import { useGetProductPromoById } from "@/lib/api/productPromo.api";

export default function DetailPilihanPaketPromoForUser({ params }: { params: Promise<{ product_promo_id: string }> }) {
  const { product_promo_id: id } = use(params);
  const { data, isLoading } = useGetProductPromoById(Number(id));

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
      <DetailPromo product={data?.data} />
    </LayoutBackgroundWhite>
  );
}
