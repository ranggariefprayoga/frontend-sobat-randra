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
  const oldPrice = product.old_price ?? 0;
  const hasDiscount = oldPrice > product.price && oldPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((oldPrice - product.price) / oldPrice) * 100) : null;

  return (
    <div className={`relative shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${!product.is_active ? "bg-gray-200 text-gray-500 pointer-events-none" : `bg-white text-gray-900`}`}>
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-56 object-cover" />

      <div className="px-2 py-4">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className={`bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs flex items-center font-medium`}>🎉 Promo</span>
        </div>
        <h2 className="text-sm md:text-base font-bold">{product.name}</h2>

        <p className="text-xs md:text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        <hr className="my-3 border-gray-300" />

        <div className="flex items-center justify-between mt-3">
          {product.old_price !== 0 && (
            <>
              <div className="flex items-center gap-2">
                {discountPercentage !== null && <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{discountPercentage}%</span>}
                {hasDiscount && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID")}</p>}
              </div>
            </>
          )}
          <p className="text-lg font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
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
