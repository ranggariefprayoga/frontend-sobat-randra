/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { createTryOutResponse } from "@/model/product.model";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserDetailInterface } from "@/model/user.model";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useCheckAvailablePremiumTryOut, useStartTryOutSession } from "@/lib/api/quisSession.api";

type Props = {
  product?: createTryOutResponse | undefined;
  user?: UserDetailInterface | undefined;
  isFreeAvailable?: boolean;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailTO({ product, user }: Props) {
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { data: isPremiumAvailable, isLoading, refetch } = useCheckAvailablePremiumTryOut(product?.id, user?.email);
  const { mutate: startPremiumTryOut, isPending } = useStartTryOutSession();
  const router = useRouter();

  const haveAccessPremium = isPremiumAvailable?.data;
  if (!product) return <ProdukBelumTersedia />;

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Loading...</div>;
  }
  const openPremiumDialog = () => {
    if (haveAccessPremium) {
      setIsPremiumDialogOpen(true);
    } else {
      toast.error("Akses premium tidak tersedia untuk produk ini.");
    }
  };

  const handlePremiumSubmit = () => {
    if (!product) return;

    startPremiumTryOut(
      {
        product_try_out_id: product.id,
      },
      {
        onSuccess: (res: any) => {
          setIsPremiumDialogOpen(false);
          refetch();
          router.push(`/quiz?sess=${res?.data?.id}&ptid=${res?.data?.product_try_out_id}&qid=${res?.data?.first_question_id}`);
          toast.success(res?.data?.message || `Try Out dimulai, tunggu sebentar...`);
        },
        onError: () => {
          toast.error("Gagal memulai sesi. Coba refresh.");
        },
      }
    );
    setIsPremiumDialogOpen(false);
  };

  // backend-api cari data quiz session dengan user_id dengan for_product_free = false

  const discount = product.old_price && product.old_price > product.price && product.old_price > 0 ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  const whatsappMessage = `https://wa.me/628774867857?text=Halo%20min%2C%20aku%20mau%20pesen%20${encodeURIComponent(product.name)}`;

  const formatCurrency = (value: number | undefined) => {
    return (
      value?.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }) ?? "Harga tidak tersedia"
    );
  };

  return (
    <div className="w-full mx-auto px-4 md:px-24 mt-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Banner */}
        <div className="relative w-full md:w-[50%] aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
          {product.banner_image ? (
            <img src={product.banner_image} alt={product.name} className="w-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">Gambar tidak tersedia</div>
          )}
        </div>

        <div className="flex flex-col md:w-[50%] w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">{product.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {!product.is_active && <Badge>📘 Tidak Aktif</Badge>}
            {!product.is_trial_product && <span className={`bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium`}>⭐ Premium</span>}
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{product.description}</p>

          <div className="md:px-0">
            <Separator className="my-4" />
          </div>

          {isPremiumAvailable?.data ? (
            <Button
              className={`relative w-full lg:w-1/3 font-semibold text-xs sm:text-sm transition duration-200 z-10 ${haveAccessPremium ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
              onClick={openPremiumDialog}
              disabled={!haveAccessPremium}
            >
              {haveAccessPremium ? "Mulai Try Out Premium" : "Anda Belum Memiliki Akses Premium"}
            </Button>
          ) : (
            <>
              {/* Harga */}
              <div className="font-semibold space-y-1 mb-6">
                <div className="flex items-center gap-2">
                  {discount !== null && <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-md mb-1">{discount}%</div>}
                  {product.old_price !== undefined && product.old_price > 0 && <span className="text-sm line-through text-muted-foreground">{formatCurrency(product.old_price)}</span>}
                </div>
                <p className="text-xl font-bold text-[#ad0a1f]">{formatCurrency(product.price)}</p>
              </div>

              {/* CTA WhatsApp */}
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="block w-full md:max-w-xs">
                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Beli Try Out</Button>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Marketing Text - bawah */}
      {product.marketing_text && product.marketing_text !== "" && (
        <div className="mt-10 bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">⭐ Tentang Try Out Premium</h1>
          {product.marketing_text}
        </div>
      )}

      {/* Dialog Akses Premium */}
      <Dialog open={isPremiumDialogOpen} onOpenChange={setIsPremiumDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yakin Ingin Memulai Try Out?</DialogTitle>
            <DialogDescription>Tekan &quot;Mulai Kerjakan!&quot; untuk memulai try out!.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsPremiumDialogOpen(false)}>
                Tutup
              </Button>
            </DialogClose>

            <Button variant="default" className="bg-[#ad0a1f] hover:bg-[#d7263d]" disabled={isPending} onClick={handlePremiumSubmit}>
              {isPending ? "Tunggu sebentar..." : "Mulai Kerjakan!"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
