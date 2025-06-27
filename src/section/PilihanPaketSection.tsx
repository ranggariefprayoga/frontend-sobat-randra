"use client";

import SemuaPaketSobatRandraSection from "@/components/AllPackageComponent/SemuaPaketSobatRandraSection";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";

import { ArrowLeft } from "lucide-react";

export default function PilihanPaketSection() {
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Pilihan Paket" subTitle="Tersedia 4 paket belajar untuk kamu!" textAlign="start" />
      <SemuaPaketSobatRandraSection />
    </LayoutBackgroundWhite>
  );
}
