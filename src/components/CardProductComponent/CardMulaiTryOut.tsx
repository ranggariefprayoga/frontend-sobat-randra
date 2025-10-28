import { TryOutProductModel } from "@/model/product.model";
import AccessButtonWithModal from "../AccessProductButton/AccessProductButton";
import { LoaderCircle } from "lucide-react";
import { useCheckAvailablePremiumTryOut } from "@/lib/api/quisSession.api";

interface ProductCardProps {
  product: TryOutProductModel;
  userEmail: string;
}

export default function CardMulaiTryOut({ product, userEmail }: ProductCardProps) {
  const { data: isPremiumAvailable, isLoading: isPremiumAvailableLoading, refetch } = useCheckAvailablePremiumTryOut(product.id, userEmail);

  if (isPremiumAvailableLoading) {
    return (
      <div className="px-4 md:px-24 flex justify-center py-12">
        <LoaderCircle className="animate-spin" strokeWidth={3} color="#ad0a1f" />
      </div>
    );
  }

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-56 object-cover" />

      <div className="px-2 py-4">
        <div className="flex items-center gap-2 text-sm mb-2">{isPremiumAvailable && <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">⭐ Premium</span>}</div>
        <h2 className="text-sm md:text-base font-bold mb-4">{product.name}</h2>
        <AccessButtonWithModal isPremiumAvailable={isPremiumAvailable?.data} productTryOutId={product.id} refetchAvailableTryOut={refetch} />
      </div>
    </div>
  );
}
