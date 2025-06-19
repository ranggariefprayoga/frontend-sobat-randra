"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";

type Props = {
  product?: bimbelBarengResponse | undefined;
  isUserAvailable: boolean | undefined;
  aksesSaatIni: number | undefined;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailBimbel({ product, isUserAvailable, aksesSaatIni }: Props) {
  const router = useRouter();
  if (!product) return <ProdukBelumTersedia />;

  const discount = product.old_price && product.old_price > product.price && product.old_price > 0 ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  const whatsappMessage = `https://wa.me/628774867857?text=Halo%20min%2C%20aku%20mau%20pesen%20${encodeURIComponent(product.name)}`;

  const sisaKuota = product.capacity - (aksesSaatIni ?? 0);

  const handleRouter = (link: string) => {
    router.push(link);
  };

  return (
    <div className="w-full mx-auto px-4 md:px-24 mt-8">
      {/* Konten */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Banner */}
        <div className="relative w-full md:w-[45%] aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
          {product.banner_image ? (
            <Image src={product.banner_image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">Gambar tidak tersedia</div>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col md:w-[55%] w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">{product.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {!product.is_active && <Badge>📘 Tidak Aktif</Badge>}
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Sisa {sisaKuota} Kuota</span>
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{product.description}</p>

          <div className="md:px-0">
            <Separator className="my-4" />
          </div>

          {isUserAvailable ? (
            <>
              <Button
                className={`relative w-full lg:w-1/3 font-semibold text-xs sm:text-sm transition duration-200 z-10 ${isUserAvailable ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
                onClick={() => handleRouter(product.link_to_whatsapp)}
                disabled={!isUserAvailable}
              >
                {isUserAvailable ? "Join Group WhatsApp Bimbel" : "Anda Belum Memiliki Akses"}
              </Button>
              <Button
                className={`relative w-full lg:w-1/3 font-semibold text-xs sm:text-sm transition duration-200 z-10 ${isUserAvailable ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
                onClick={() => handleRouter(product.link_to_meeting)}
                disabled={!isUserAvailable}
              >
                {isUserAvailable ? "Link Meeting" : "Anda Belum Memiliki Akses"}
              </Button>
            </>
          ) : (
            <>
              {/* Harga */}
              <div className="font-semibold space-y-1 mb-6">
                <div className="flex items-center gap-2">
                  {discount !== null && <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-md mb-1">{discount}%</div>}
                  {product.old_price !== undefined && product.old_price > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                      {product.old_price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
              </div>

              {/* CTA WhatsApp */}
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="block w-full md:max-w-xs">
                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Beli Bimbel Bareng</Button>
              </a>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {product.jadwal_bimbel_image && (
          <div className="relative w-full md:w-[45%] aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
            <Image src={product.jadwal_bimbel_image} alt="Jadwal Bimbel" fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority />
          </div>
        )}
        {product.marketing_text && product.marketing_text !== "" && (
          <div className="mt-10 bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">Tentang Paket</h1>
            {product.marketing_text}
          </div>
        )}
      </div>
    </div>
  );
}
