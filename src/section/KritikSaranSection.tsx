"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";

export default function KritikSaranSection() {
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Kritik dan Saran" subTitle="Bantu kami jadi lebih baik yuk—ada saran?" />
    </LayoutBackgroundWhite>
  );
}
