"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import UpdateProductTryOutModal from "../Dialog/UpdateProductTryOut";
import DetailTO from "@/pages/PilihanPaket/DetailTO";
import { useUser } from "@/lib/api/user.api";
import { useCheckAvailableFreeTryOut } from "@/lib/api/quisSession.api";
import { useGetTryOutProductByIdForAdminExcludeFree } from "@/lib/api/productTryOut.api";

export default function DetailPilihanPaketTOForAdmin({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const { data: product, isLoading } = useGetTryOutProductByIdForAdminExcludeFree(Number(id));
  const { data: detailUser, isLoading: detailUserLoading } = useUser();
  const { data: isFreeAvailable, isLoading: isAvailableLoading } = useCheckAvailableFreeTryOut(Number(id), detailUser?.data?.id ?? 0);

  if (isLoading || detailUserLoading || isAvailableLoading) {
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
          <UpdateProductTryOutModal initialData={product?.data} />
        </div>
      )}
      <DetailTO product={product?.data} isFreeAvailable={isFreeAvailable?.data} user={detailUser?.data} />
    </LayoutBackgroundWhite>
  );
}
