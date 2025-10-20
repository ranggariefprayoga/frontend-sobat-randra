"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetTryOutProductByIdForAdminIncludeFree } from "@/lib/api/productTryOut.api";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useUser } from "@/lib/api/user.api";
import UpdateFreeProductTryOutModal from "../Dialog/UpdateFreeTryOut";
import DetailTOFree from "@/halaman/PilihanPaket/DetailTOFree";

export default function DetailPilihanPaketTOFreeForAdmin({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const { data: product, isLoading } = useGetTryOutProductByIdForAdminIncludeFree(Number(id));
  const { data: detailUser, isLoading: detailUserLoading } = useUser();

  if (isLoading || detailUserLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }
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
      {product && (
        <div className="w-full px-4 md:px-24 mt-4 md:mt-8">
          <UpdateFreeProductTryOutModal initialData={product?.data} />
        </div>
      )}
      <DetailTOFree product={product?.data} user={detailUser?.data} />
    </LayoutBackgroundWhite>
  );
}
