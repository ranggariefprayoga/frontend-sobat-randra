import { TryOutProductModel } from "@/model/product.model";
import AccessButtonWithModal from "../AccessProductButton/AccessProductButton";
import { useCheckAvailablePremium } from "@/lib/api/quisSession.api";
import { LoaderCircle } from "lucide-react";

interface ProductCardProps {
  product: TryOutProductModel;
  userEmail: string;
}

export default function CardMulaiTryOut({ product, userEmail }: ProductCardProps) {
  const { data: isPremiumAvailable, isLoading: isPremiumAvailableLoading } = useCheckAvailablePremium(product.id, userEmail);

  if (isPremiumAvailableLoading) {
    return (
      <div className="px-8 md:px-24 flex justify-center py-12">
        <LoaderCircle className="animate-spin" strokeWidth={3} color="#ad0a1f" />
      </div>
    );
  }

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm mb-2">{isPremiumAvailable && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>}</div>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>
        <AccessButtonWithModal isPremiumAvailable={isPremiumAvailable?.data} />
      </div>
    </div>
  );
}
