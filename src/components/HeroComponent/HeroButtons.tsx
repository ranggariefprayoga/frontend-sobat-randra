"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function HeroButtons() {
  const router = useRouter();

  const handleProductClick = () => {
    router.push("/pilihan-paket");
  };

  const handleWhatsAppClick = () => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = encodeURIComponent("Halo min, aku mau nanya-nanya dong tentang Try Out Premium Sobat Randra.");
    const url = `https://wa.me/${number}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-row gap-2 justify-center lg:justify-start">
      <Button size="sm" variant="outline" onClick={handleProductClick} className="rounded-full text-orange-700 bg-orange-100">
        Lihat semua produk
      </Button>
      <Button size="sm" variant="outline" onClick={handleWhatsAppClick} className="text-green-700 bg-green-100  rounded-full">
        Hubungi Kami
      </Button>
    </div>
  );
}
