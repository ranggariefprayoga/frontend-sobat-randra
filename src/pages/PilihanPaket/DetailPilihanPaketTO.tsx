"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetTryOutProductById } from "@/lib/api/productTryOut.api";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import DetailTO from "./DetailTO";

export default function DetailPilihanPaketTO({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id: id } = use(params);
  const { data: product, isLoading } = useGetTryOutProductById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  console.log(product);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <DetailTO product={product?.data} />
    </LayoutBackgroundWhite>
  );
}
