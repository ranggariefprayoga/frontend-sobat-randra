"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { createTryOutResponse } from "@/model/product.model";
import { Button } from "@/components/ui/button";

type Props = {
  product?: createTryOutResponse | undefined;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailTO({ product }: Props) {
  if (!product) return <ProdukBelumTersedia />;

  const discount = product.old_price && product.old_price > product.price && product.old_price > 0 ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  const whatsappMessage = `https://wa.me/628774867857?text=Halo%20min%2C%20aku%20mau%20pesen%20${encodeURIComponent(product.name)}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-24 mt-8">
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
            {product.is_free_available && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Gratis</span>}
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{product.description}</p>

          {product.is_free_available && product.link_to_form && (
            <p className="text-sm mb-3">
              🔐 Dapatkan password Try Out:{" "}
              <a href={product.link_to_form} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                di sini
              </a>
            </p>
          )}

          <div className="md:px-0">
            <Separator className="mb-4" />
          </div>

          {/* Harga */}
          <div className="text-lg font-semibold space-y-1 mb-6">
            {discount !== null && <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-md mb-1">{discount}%</div>}
            <div className="flex items-center gap-2">
              {product.old_price !== undefined && product.old_price > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  {product.old_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              )}

              <p className="text-2xl font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="block w-full md:max-w-xs">
            <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Pesan Sekarang via WhatsApp</Button>
          </a>
        </div>
      </div>

      {/* Marketing Text - bawah */}
      {product.marketing_text && product.marketing_text !== "" && (
        <div className="mt-10 bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">Tentang Paket</h1>
          {product.marketing_text}
        </div>
      )}
    </div>
  );
}
