"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundRed from "@/layout/LayoutBackgroundRed";
import { ArrowLeft } from "lucide-react";

export default function RangkingNasionalSection() {
  return (
    <LayoutBackgroundRed>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" color="text-white" />
      <TitleComponent title="Rangking Nasional" subTitle="Lihat Peringkat kamu" subTitleColor="text-[#FFA500]" titleColor="text-white" />
    </LayoutBackgroundRed>
  );
}
