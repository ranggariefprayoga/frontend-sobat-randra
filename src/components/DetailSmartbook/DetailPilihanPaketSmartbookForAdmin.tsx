"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useGetSmartbookProductByIdForAdmin } from "@/lib/api/productSmartbook.api";
import UpdateProductSmartbookModal from "../Dialog/UpdateSmartbookModal";
import DetailSmartbook from "@/halaman/PilihanPaket/DetailSmartbook";

export default function DetailPilihanPaketSmartbookForAdmin({ params }: { params: Promise<{ product_smartbook_id: string }> }) {
  const { product_smartbook_id: id } = use(params);
  const { data, isLoading } = useGetSmartbookProductByIdForAdmin(Number(id));

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
          <UpdateProductSmartbookModal initialData={data?.data} />
        </div>
      )}
      <DetailSmartbook product={data?.data} />
    </LayoutBackgroundWhite>
  );
}
