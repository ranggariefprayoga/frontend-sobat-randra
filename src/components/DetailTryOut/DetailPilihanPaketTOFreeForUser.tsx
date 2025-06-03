"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetTryOutProductByIdForUserIncludeFree } from "@/lib/api/productTryOut.api";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useUser } from "@/lib/api/user.api";
import DetailTOFree from "@/pages/PilihanPaket/DetailTOFree";
import { useCheckAvailableFree } from "@/lib/api/quisSession.api";

export default function DetailPilihanPaketTOFreeForUser({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const { data: product, isLoading } = useGetTryOutProductByIdForUserIncludeFree(Number(id));
  const { data: detailUser, isLoading: detailUserLoading } = useUser();

  const userId = detailUser?.data?.id;

  const { data: isFreeAvailable, isLoading: isAvailableLoading } = useCheckAvailableFree(Number(id), userId);

  const isAnyLoading = isLoading || detailUserLoading || (userId && isAvailableLoading);

  if (isAnyLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <DetailTOFree product={product?.data} isFreeAvailable={isFreeAvailable?.data} user={detailUser?.data} />
    </LayoutBackgroundWhite>
  );
}
