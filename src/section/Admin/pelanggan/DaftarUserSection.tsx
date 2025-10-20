"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import DaftarUser from "@/halaman/Admin/PelangganComponent";
import { ArrowLeft } from "lucide-react";

export default function DaftarUserSection() {
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Daftar User" />
      <DaftarUser />
    </LayoutBackgroundWhite>
  );
}
