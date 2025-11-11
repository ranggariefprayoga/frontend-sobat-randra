"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import DaftarPelangganYangSudahMengerjakanTO from "./DaftarPelangganYangSudahMengerjakanTO";
import { useGetSessionsByProductId } from "@/lib/api/quisSession.api";

export default function DaftarPelangganTOSection({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const { data: tryOutSessionByProductId, isLoading, refetch } = useGetSessionsByProductId(Number(id));

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
      <TitleComponent title="Daftar Pengerjaan Try Out" />
      <DaftarPelangganYangSudahMengerjakanTO detailPengerjaan={tryOutSessionByProductId?.data} refetch={refetch} meta={tryOutSessionByProductId?.meta} />
    </LayoutBackgroundWhite>
  );
}
