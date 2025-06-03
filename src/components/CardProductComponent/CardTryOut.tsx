"use client";

import { TryOutProductModel } from "@/model/product.model";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: TryOutProductModel;
  customLink: string;
  buttonText?: string;
}

export default function CardTryOut({ product, customLink, buttonText = "Lihat Detail" }: ProductCardProps) {
  const isFreeAvailable = product.is_trial_product;
  const router = useRouter();

  const discountPercentage = product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-300 text-gray-500 pointer-events-none" : "bg-white text-gray-900 "}`}>
      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge Kategori */}
        <div className="flex items-center gap-2 text-sm mb-2">
          {isFreeAvailable && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Gratis</span>}
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>
        </div>

        {/* Judul Produk */}
        <h2 className="text-lg font-bold">{product.name}</h2>

        {/* Deskripsi - Hanya 1 Baris, Jika Lebih Pakai Ellipsis */}
        <p className="text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        {/* Garis Pembatas */}
        <hr className="my-3 border-gray-200" />

        {/* Harga Produk & Diskon */}
        {!isFreeAvailable && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {discountPercentage !== null && <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{discountPercentage}%</span>}
              {(product.old_price ?? 0) > 0 && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID") ?? ""}</p>}
            </div>
            <p className="text-lg font-bold text-[#ad0a1f]">{`Rp ${product.price.toLocaleString("id-ID")}`}</p>
          </div>
        )}

        {isFreeAvailable && <p className="text-lg font-bold text-[#ad0a1f]">GRATIS</p>}

        {/* Tombol Navigasi */}
        <Button
          className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white hover:bg-gray-600"}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
          disabled={!product.is_active}
        >
          {product.is_active ? buttonText : "Try Out Belum Tersedia"}
        </Button>
      </div>
    </div>
  );
}
