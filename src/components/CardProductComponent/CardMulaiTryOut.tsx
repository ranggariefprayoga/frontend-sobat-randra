import { TryOutProductModel } from "@/model/product.model";
import AccessButtonWithModal from "../AccessProductButton/AccessProductButton";

interface ProductCardProps {
  product: TryOutProductModel;
}

export default function CardMulaiTryOut({ product }: ProductCardProps) {
  const isHaveAccessGratis = true;
  const isHaveAccessPremium = true;

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge Kategori */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Gratis</span>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>
        </div>

        {/* Judul Produk */}
        <h2 className="text-lg font-bold">{product.name}</h2>

        {/* Deskripsi - Hanya 1 Baris, Jika Lebih Pakai Ellipsis */}
        <p className="text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        <AccessButtonWithModal product={product} haveAccessGratis={isHaveAccessGratis} haveAccessPremium={isHaveAccessPremium} />
      </div>
    </div>
  );
}
