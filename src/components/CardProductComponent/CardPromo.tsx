"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ProductPromoResponse } from "@/model/productPromo.model";

interface ProductCardProps {
  product: ProductPromoResponse;
  customLink: string;
  buttonText?: string;
}

export default function CardPromo({ product, customLink, buttonText = "Lihat Detail" }: ProductCardProps) {
  const router = useRouter();

  const discountPercentage = product.old_price && product.old_price > product.price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  return (
    <div className={`relative shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${!product.is_active ? "bg-gray-200 text-gray-500 pointer-events-none" : `bg-white text-gray-900`}`}>
      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Judul Produk */}
        <h2 className="text-sm md:text-base font-bold">{product.name}</h2>

        {/* Deskripsi */}
        <p className="text-xs md:text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        <hr className="my-3 border-gray-300" />

        {/* Harga Produk */}
        <div className="flex items-center justify-between">
          <>
            <div className="flex items-center gap-2">
              {discountPercentage !== null && <span className="text-xs bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{discountPercentage}%</span>}
              {(product.old_price ?? 0) > 0 && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID")}</p>}
            </div>
            <p className="text-xs md:text-sm font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
          </>
        </div>

        {/* Tombol */}
        <Button
          className={`mt-4 w-full py-2 font-semibold rounded-full text-xs md:text-sm transition duration-200 ${product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white hover:bg-gray-600"}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
          disabled={!product.is_active}
        >
          {product.is_active ? buttonText : "Promo Belum Tersedia"}
        </Button>
      </div>
    </div>
  );
}
