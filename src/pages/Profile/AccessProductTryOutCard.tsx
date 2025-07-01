"use client";

import { useGetTryOutProductsNameById } from "@/lib/api/productTryOut.api";
import { ProductAccessTryOutResponse } from "@/model/productAccess.model";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccessProductTryOutCardProps {
  access: ProductAccessTryOutResponse;
}

export const AccessProductTryOutCard: React.FC<AccessProductTryOutCardProps> = ({ access }) => {
  const { data, isLoading } = useGetTryOutProductsNameById(access.product_try_out_id);
  const router = useRouter();

  const handleLihatDetail = () => {
    router.push(`/pilihan-paket/tryout/${access.product_try_out_id}`);
  };

  return (
    <div className="my-4">
      <div className="w-full mx-auto flex flex-col items-start gap-3 bg-green-50 border-l-4 border-green-400 shadow-sm px-1 py-2 rounded-md">
        <div className="flex items-center gap-2 text-green-600">
          {access.get_access ? <CheckCircle size={16} className="text-green-700 bg-green-100 p-1 rounded-full" /> : <XCircle size={16} className="text-red-700 bg-red-100 p-1 rounded-full" />}
          <p className="text-sm font-semibold break-all w-full">{isLoading ? "Memuat nama produk..." : data?.data?.name ?? "Nama produk tidak ditemukan"}</p>
        </div>
        <div className="text-sm text-gray-700 p-1">
          <Button variant="outline" onClick={handleLihatDetail} size="sm">
            Lihat Detail
          </Button>
        </div>
      </div>
    </div>
  );
};
