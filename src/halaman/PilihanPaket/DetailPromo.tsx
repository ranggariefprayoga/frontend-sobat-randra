"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductPromoResponse } from "@/model/productPromo.model";

type Props = {
  product?: ProductPromoResponse | undefined;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailPromo({ product }: Props) {
  if (!product) return <ProdukBelumTersedia />;

  const discount = product.old_price && product.old_price > product.price && product.old_price > 0 ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  const whatsappMessage = `https://wa.me/6285124631275?text=Halo%20min%2C%20aku%20mau%20pesen%20${encodeURIComponent(product.name)}`;

  return (
    <div className="w-full mx-auto px-4 md:px-24 mt-8">
      {/* Konten */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Banner */}
        <div className="relative w-full md:w-[50%] aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
          {product.banner_image ? (
            <img src={product.banner_image} alt={product.name} className="w-full h-full object-contain" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">Gambar tidak tersedia</div>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col md:w-[50%] w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">{product.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">{!product.is_active && <Badge>📘 Tidak Aktif</Badge>}</div>

          <p className="text-sm text-gray-700 whitespace-pre-line">{product.description}</p>

          <div className="md:px-0">
            <Separator className="my-2" />
          </div>

          <>
            <div className="font-semibold space-y-1 mb-6">
              <div className="flex items-center gap-2">
                {discount !== null && <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-md mb-1">{discount}%</div>}
                {product.old_price !== undefined && product.old_price > 0 && <span className="text-sm line-through text-muted-foreground">Rp {product.old_price.toLocaleString("id-ID")}</span>}
              </div>
              <p className="text-xl font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
            <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="block w-full md:max-w-xs">
              <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Beli Paket Promo</Button>
            </a>
          </>
        </div>
      </div>

      {product.marketing_text && product.marketing_text !== "" && (
        <div className="mt-10 bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          <h1 className="text-xl md:text-2xl  font-bold text-[#ad0a1f] uppercase mb-2">🏷️ Tentang Promo</h1>
          {product.marketing_text}
        </div>
      )}
    </div>
  );
}
