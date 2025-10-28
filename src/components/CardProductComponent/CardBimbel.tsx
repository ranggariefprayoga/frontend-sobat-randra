"use client";

import { useGetCountBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { useRouter } from "next/navigation";

interface ProductCardBimbelProps {
  product: bimbelBarengResponse;
  customLink: string;
  buttonText?: string;
}

export default function CardBimbel({ product, customLink, buttonText = "Lihat Detail" }: ProductCardBimbelProps) {
  const router = useRouter();
  const { data, isLoading } = useGetCountBimbelBarengAccess(product.id);
  const oldPrice = product.old_price ?? 0;
  const hasDiscount = oldPrice > product.price && oldPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((oldPrice - product.price) / oldPrice) * 100) : null;

  const sisaKuota = (product.capacity ?? 0) - (data?.data ?? 0);

  return (
    <div className={`relative shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-300 text-gray-500" : "bg-white text-gray-900"}`}>
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-56 object-cover" />

      <div className="px-2 py-4">
        <div className="flex items-center gap-1 mb-2">
          <span className={`bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium`}>🎓 Bimbel Bareng</span>
          {isLoading ? <h1 className="text-xs">Tunggu sebentar...</h1> : <>{product.capacity && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">👥 Sisa {sisaKuota} kuota</span>}</>}
        </div>

        <h2 className="text-sm md:text-base font-bold">{product.name}</h2>

        <p className="text-xs md:text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        <hr className="my-3 border-gray-200" />

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
        <button
          className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white pointer-events-none"}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
          disabled={!product.is_active}
        >
          {product.is_active ? buttonText : "Bimbel Belum Tersedia"}
        </button>
      </div>
    </div>
  );
}
