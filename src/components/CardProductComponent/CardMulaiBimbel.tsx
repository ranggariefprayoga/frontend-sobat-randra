import { LoaderCircle } from "lucide-react";
import { bimbelBarengResponse } from "@/model/productBimbelBareng.model";
import { useCheckAvailableBimbelBareng, useGetCountBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";

interface ProductCardProps {
  product: bimbelBarengResponse;
  userEmail: string;
}

export default function CardMulaiBimbel({ product, userEmail }: ProductCardProps) {
  const { data: isPremiumAvailable, isLoading: isPremiumAvailableLoading } = useCheckAvailableBimbelBareng(product.id, userEmail);
  const { data, isLoading } = useGetCountBimbelBarengAccess(product.id);

  const sisaKuota = (product.capacity ?? 0) - (data?.data ?? 0);

  if (isPremiumAvailableLoading) {
    return (
      <div className="px-4 md:px-24 flex justify-center py-12">
        <LoaderCircle className="animate-spin" strokeWidth={3} color="#ad0a1f" />
      </div>
    );
  }

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      <img src={product.jadwal_bimbel_image || "/no-image.png"} alt={product.name} className="w-full h-56 object-cover" />

      <div className="px-2 py-4">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className={`bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium`}>🎓 Bimbel Bareng</span>
          {isLoading ? <h1 className="text-xs">Tunggu sebentar...</h1> : <>{product.capacity && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">👥 Sisa {sisaKuota} kuota</span>}</>}
        </div>
        <h2 className="text-sm md:text-base font-bold mb-4">{product.name}</h2>
        <div className="space-y-4">
          {isPremiumAvailable?.data ? (
            <div className="flex justify-between items-center gap-4">
              <a href={product.link_to_meeting} target="_blank" className="bg-[#ad0a1f] font-semibold text-xs w-full text-white p-2 rounded-full text-center shadow-md hover:shadow-lg hover:bg-[#d7263d]">
                Join Meeting
              </a>
              <a href={product.link_to_whatsapp} target="_blank" className="bg-[#25D366] font-semibold text-xs w-full text-white p-2 rounded-full text-center shadow-md hover:shadow-lg hover:bg-[#128C7E]">
                WhatsApp Grup
              </a>
            </div>
          ) : (
            <button className="relative w-full py-2 font-semibold rounded-full text-xs sm:text-sm transition duration-200 z-10 bg-gray-500 text-white cursor-not-allowed">Anda Belum Memiliki Akses Bimbel Ini</button>
          )}
        </div>
      </div>
    </div>
  );
}
