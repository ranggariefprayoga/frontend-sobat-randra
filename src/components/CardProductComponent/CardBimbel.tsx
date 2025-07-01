"use client";

import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { useRouter } from "next/navigation";

interface ProductCardBimbelProps {
  product: bimbelBarengResponse;
  customLink: string;
  buttonText?: string;
}

export default function CardBimbel({ product, customLink, buttonText = "Lihat Detail" }: ProductCardBimbelProps) {
  const router = useRouter();

  return (
    <div className={`relative shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-300 text-gray-500" : "bg-white text-gray-900"}`}>
      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge Kategori */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className={`bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center`}>📘 Kelas belajar bareng</span>
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
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-[#ad0a1f]">{product.price === 0 ? "GRATIS" : `Rp ${product.price.toLocaleString("id-ID")}`}</p>
          {product.old_price && product.price !== product.old_price && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID")}</p>}
        </div>

        {/* Tombol Navigasi */}
        <button
          className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white pointer-events-none"}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
          disabled={!product.is_active}
        >
          {product.is_active ? buttonText : "Belum Tersedia"}
        </button>
      </div>
    </div>
  );
}
