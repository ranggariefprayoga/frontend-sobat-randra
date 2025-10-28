"use client";

import SemuaPaketSobatRandraSection from "@/components/AllPackageComponent/SemuaPaketSobatRandraSection";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { ArrowLeft } from "lucide-react";

export default function PilihanPaketSection() {
  return (
    <>
      <div className="w-full bg-cover bg-center bg-no-repeat py-4" style={{ backgroundImage: 'url("/background/3.png")' }}>
        <div className="max-w-[1420px] mx-auto">
          <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
          <TitleComponent title="Pilihan Paket" subTitle="Paket belajar untuk kamu!" textAlign="start" />
          <SemuaPaketSobatRandraSection />
        </div>
      </div>
    </>
  );
}
