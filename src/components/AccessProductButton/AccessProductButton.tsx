/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useStartTryOutSession } from "@/lib/api/quisSession.api";
import { useRouter } from "next/navigation";

export default function AccessButtonWithModal({ isPremiumAvailable, productTryOutId, refetchAvailableTryOut }: { isPremiumAvailable: boolean | undefined; productTryOutId: number; refetchAvailableTryOut: () => void }) {
  const router = useRouter();
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { mutate: startPremiumTryOut, isPending } = useStartTryOutSession();

  const haveAccessPremium = isPremiumAvailable;

  // Fungsi untuk membuka dialog Akses Premium
  const openPremiumDialog = () => {
    if (haveAccessPremium) {
      setIsPremiumDialogOpen(true);
    } else {
      toast.error("Akses premium tidak tersedia untuk produk ini.");
    }
  };

  const handlePremiumSubmit = () => {
    if (!productTryOutId) return;

    startPremiumTryOut(
      {
        product_try_out_id: productTryOutId,
      },
      {
        onSuccess: (res: any) => {
          setIsPremiumDialogOpen(false);
          refetchAvailableTryOut();
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

  return (
    <div>
      {/* Tombol Akses Premium */}
      <button
        className={`relative w-full py-2 font-semibold rounded-full text-xs sm:text-sm transition duration-200 z-10 ${haveAccessPremium ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
        onClick={openPremiumDialog}
        disabled={!haveAccessPremium}
      >
        {haveAccessPremium ? "Mulai Try Out Premium" : "Anda Belum Memiliki Akses Premium"}
      </button>

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
