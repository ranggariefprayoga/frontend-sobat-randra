"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import DetailTO from "./DetailTO";
import { DialogInfo } from "@/components/Dialog/DialogInfo";
import { caraAksesTryOut } from "@/data/cara-akses-to";
import { useGetTryOutProductByIdExcludeFree } from "@/lib/api/productTryOut.api";
import { useUser } from "@/lib/api/user.api";
import { useCheckAvailableFree } from "@/lib/api/quisSession.api";

export default function DetailPilihanPaketTO({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const { data, isLoading } = useGetTryOutProductByIdExcludeFree(Number(id));
  const { data: detailUser, isLoading: detailUserLoading } = useUser();
  const { data: isAvailable, isLoading: isAvailableLoading } = useCheckAvailableFree(Number(id), detailUser?.data?.id ?? 0);

  if (isLoading || detailUserLoading || isAvailableLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <div className="flex-flex-col lg:flex-row px-8 md:px-24 gap-2">
        {caraAksesTryOut.map((item) => (
          <DialogInfo key={item.title} title={item.title} description={item.description} triggerText={item.trigger} details={item.details} />
        ))}
      </div>

      <DetailTO product={data?.data} user={detailUser?.data} isFreeAvailable={isAvailable?.data} />
    </LayoutBackgroundWhite>
  );
}
