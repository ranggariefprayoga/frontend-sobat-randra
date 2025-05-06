"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TryOutProductModel } from "@/model/product.model";
import { toast } from "sonner";

export default function AccessButtonWithModal({ isPremiumAvailable, product, isFreeAvailable }: { isPremiumAvailable: boolean | undefined; product: TryOutProductModel; isFreeAvailable: boolean | undefined }) {
  const [isGratisDialogOpen, setIsGratisDialogOpen] = useState(false);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const haveAccessGratis = isFreeAvailable;
  const haveAccessPremium = isPremiumAvailable;
  const correctPassword = product.password;
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
      toast.success(`Password benar, silakan klik "Mulai Kerjakan!" untuk mulai belajar.`);
    } else {
      toast.error("Password yang Anda masukkan salah! Coba lagi.");
      setPassword("");
    }
  };

  // Fungsi untuk membuka dialog Akses Gratis
  const openGratisDialog = () => {
    if (haveAccessGratis) {
      setIsGratisDialogOpen(true);
    } else {
      toast.error("Akses gratis tidak tersedia untuk produk ini.");
    }
  };

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

  const handleGratisSubmit = () => {
    console.log(password);
    toast.success(`Try Out dimulai gratis, tunggu sebentar...`);
    setIsGratisDialogOpen(false);
    setPassword("");
    setIsPasswordCorrect(false);
  };

  return (
    <div>
      {/* Tombol Akses Gratis */}
      <button
        className={`relative mt-3 w-full py-2 font-semibold rounded-full text-xs sm:text-sm transition duration-200 z-10 ${haveAccessGratis ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
        onClick={openGratisDialog}
        disabled={!haveAccessGratis}
      >
        {haveAccessGratis ? "Mulai Try Out Gratis" : "Akses Gratis Anda Sudah Habis"}
      </button>

      {/* Tombol Akses Premium */}
      <button
        className={`relative mt-3 w-full py-2 font-semibold rounded-full text-xs sm:text-sm transition duration-200 z-10 ${haveAccessPremium ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
        onClick={openPremiumDialog}
        disabled={!haveAccessPremium}
      >
        {haveAccessPremium ? "Mulai Try Out Premium" : "Anda Belum Memiliki Akses Premium"}
      </button>

      {/* Dialog Akses Gratis */}
      <Dialog open={isGratisDialogOpen} onOpenChange={setIsGratisDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Akses Gratis</DialogTitle>
            <DialogDescription>Masukkan password untuk mendapatkan akses gratis ke {product.name}.</DialogDescription>
          </DialogHeader>

          <div className="grid">
            <div className="grid grid-cols-2 items-center gap-4">
              <Input disabled={isPasswordCorrect} id="password" type="password" placeholder="Cek password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGratisDialogOpen(false)}>
              Tutup
            </Button>
            <Button variant="default" className="bg-[#ad0a1f] hover:bg-[#d7263d]" onClick={handlePasswordSubmit} disabled={isPasswordCorrect}>
              Cek Password
            </Button>

            {/* Tombol Mulai Kerjakan, hanya muncul setelah password benar */}
            {isPasswordCorrect && (
              <Button variant="default" onClick={handleGratisSubmit}>
                Mulai Kerjakan!
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
