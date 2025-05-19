"use client";

import { useState } from "react";
import { TryOutProductModel } from "@/model/product.model";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useDeleteTryOutProductById } from "@/lib/api/productTryOut.api";
import { toast } from "sonner";

interface ProductCardProps {
  product: TryOutProductModel;
  customLink: string;
  buttonText?: string;
}

export default function CardTryOutForAdmin({ product, customLink, buttonText = "Lihat Detail" }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const isFreeAvailable = product.is_free_available;
  const router = useRouter();
  const deleteMutation = useDeleteTryOutProductById();
  const oldPrice = product.old_price ?? 0;
  const hasDiscount = oldPrice > product.price && oldPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((oldPrice - product.price) / oldPrice) * 100) : null;

  const handleDelete = () => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success("Try Out berhasil dihapus.");
        setOpen(false);
      },
      onError: () => {
        toast.error("Gagal menghapus Try Out.");
      },
    });
  };

  return (
    <div className={`relative shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-300 text-gray-500" : "bg-white text-gray-900"}`}>
      {/* Tombol Hapus */}
      <div className="absolute top-2 right-2 z-20">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="text-xs px-3 py-1">
              Hapus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yakin ingin menghapus?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">Produk Try Out ini akan dihapus secara permanen.</p>
            <DialogFooter className="gap-2  sm:justify-end">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Tutup
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gambar Produk */}
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge */}
        <div className="flex items-center gap-2 text-sm mb-2">
          {isFreeAvailable && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">📘 Gratis</span>}
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">📘 Premium</span>
        </div>

        {/* Nama & Deskripsi */}
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>

        {/* Divider */}
        <hr className="my-3 border-gray-200" />

        {/* Harga */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {discountPercentage !== null && <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{discountPercentage}%</span>}
            {hasDiscount && <p className="text-xs line-through text-gray-500">Rp {product.old_price?.toLocaleString("id-ID")}</p>}
          </div>
          <p className="text-lg font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
        </div>

        {/* Tombol Lihat Detail */}
        <Button
          className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${
            product.is_active ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-200 text-gray-700 border border-gray-400 hover:bg-gray-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            router.push(customLink);
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
