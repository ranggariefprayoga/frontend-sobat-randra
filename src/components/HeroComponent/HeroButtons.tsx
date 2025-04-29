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
    const message = encodeURIComponent("Halo min, aku mau nanya-nanya dong tentang Try Out Pejuang Kedinasan");
    const url = `https://wa.me/${number}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
      <Button variant="ghost" onClick={handleProductClick} className="rounded-full bg-[#FFA500] text-black hover:bg-[#FF8C00]">
        Lihat semua produk
      </Button>
      <Button variant="ghost" onClick={handleWhatsAppClick} className="bg-green-500 text-white  rounded-full">
        Hubungi Kami
      </Button>
    </div>
  );
}
