"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Button } from "@/components/ui/button";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";

export default function PushProdukMayarSection() {
  const handleMayarPortalClick = () => {
    const url = `https://sobat-randra.myr.id/portal`;
    window.open(url, "_blank");
  };
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Push Produk Mayar" />
      <div className="flex justify-center">
        <Button size="lg" variant="outline" onClick={handleMayarPortalClick} className="rounded-full text-orange-700 bg-orange-100">
          Klik Disini
        </Button>
      </div>
    </LayoutBackgroundWhite>
  );
}
