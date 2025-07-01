"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useGetSmartbookProductByIdForUser } from "@/lib/api/productSmartbook.api";
import DetailSmartbook from "./DetailSmartbook";

export default function DetailPilihanPaketSmartbookForUser({ params }: { params: Promise<{ product_smartbook_id: string }> }) {
  const { product_smartbook_id: id } = use(params);
  const { data, isLoading } = useGetSmartbookProductByIdForUser(Number(id));

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
      <DetailSmartbook product={data?.data} />
    </LayoutBackgroundWhite>
  );
}
