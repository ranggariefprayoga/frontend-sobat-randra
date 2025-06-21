"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useUser } from "@/lib/api/user.api";
import { useCheckAvailableBimbelBareng, useGetCountBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";
import { useGetBimbelBarengProductByIdForAdmin } from "@/lib/api/productBimbelBareng.api";
import DetailBimbel from "@/pages/PilihanPaket/DetailBimbel";
import UpdateProductBimbelBarengModal from "../Dialog/UpdateBimbelModal";

export default function DetailPilihanPaketBimbelForAdmin({ params }: { params: Promise<{ product_bimbel_bareng_id: string }> }) {
  const { product_bimbel_bareng_id: id } = use(params);
  const { data, isLoading } = useGetBimbelBarengProductByIdForAdmin(Number(id));
  const { data: aksesSaatIni, isLoading: isLoadingCountAccess } = useGetCountBimbelBarengAccess(Number(id));
  const { data: detailUser, isLoading: detailUserLoading } = useUser();
  const { data: isAvailable, isLoading: isAvailableLoading } = useCheckAvailableBimbelBareng(Number(id), detailUser?.data?.email);

  if (isLoading || detailUserLoading || isAvailableLoading || isLoadingCountAccess) {
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
          <UpdateProductBimbelBarengModal initialData={data?.data} />
        </div>
      )}
      <DetailBimbel product={data?.data} isUserAvailable={isAvailable?.data} aksesSaatIni={aksesSaatIni?.data} />
    </LayoutBackgroundWhite>
  );
}
