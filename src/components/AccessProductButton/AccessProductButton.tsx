"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AccessButtonWithModal({ isPremiumAvailable }: { isPremiumAvailable: boolean | undefined }) {
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);

  const haveAccessPremium = isPremiumAvailable;

  // Fungsi untuk membuka dialog Akses Premium
  const openPremiumDialog = () => {
    if (haveAccessPremium) {
      setIsPremiumDialogOpen(true);
    } else {
      toast.error("Akses premium tidak tersedia untuk produk ini.");
    }
  };

  // backend-api cari data quiz session dengan user_id dengan for_product_free = false
  const handlePremiumSubmit = () => {
    toast.success(`Try Out dimulai premium, tunggu sebentar...`);
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

            <Button variant="default" className="bg-[#ad0a1f] hover:bg-[#d7263d]" onClick={handlePremiumSubmit}>
              Mulai Kerjakan!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
