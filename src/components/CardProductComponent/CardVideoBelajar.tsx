"use client";

import { ProductVideoBelajarResponse } from "@/model/productVideoBelajar.model";
import { useRouter } from "next/navigation";

interface ProductCardVideoBelajarProps {
  product: ProductVideoBelajarResponse;
  customLink: string;
  buttonText?: string;
}

export default function CardVideoBelajar({ product, customLink, buttonText = "Lihat Detail" }: ProductCardVideoBelajarProps) {
  const router = useRouter();

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      {/* Overlay jika produk tidak aktif */}
      {!product.is_active && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
          <span className="text-white font-semibold text-sm">Tidak Aktif</span>
        </div>
      )}

      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge Kategori */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className={`bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center font-medium`}>🎬 Video Belajar</span>
        </div>

        <h2 className="text-sm md:text-base font-bold">{product.name}</h2>

        <p className="text-xs md:text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        {/* Garis Pembatas */}
        <hr className="my-3 border-gray-200" />

        {/* Harga Produk & Diskon */}
        <div className="flex items-center justify-between mt-3">
          {product.old_price && product.price !== product.old_price && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID")}</p>}
          <p className="text-lg font-bold text-[#ad0a1f]">{product.price === 0 ? "GRATIS" : `Rp ${product.price.toLocaleString("id-ID")}`}</p>
        </div>

        {/* Tombol Navigasi */}
        <button
          className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white hover:bg-gray-600"}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
