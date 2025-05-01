"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TryOutProductModel } from "@/model/product.model";
import { toast } from "sonner"; // Mengimpor toast dari Sonner

const correctPassword = "12345";

const AccessButtonWithModal = ({ haveAccessGratis, haveAccessPremium, product }: { haveAccessGratis: boolean; haveAccessPremium: boolean; product: TryOutProductModel }) => {
  const [isGratisDialogOpen, setIsGratisDialogOpen] = useState(false);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);

  const [password, setPassword] = useState(""); // Untuk menyimpan input password
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // Menyimpan status apakah password benar

  // Fungsi untuk menangani pengiriman password
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordCorrect(true); // Jika password benar, set status true
      toast.success(`Password benar, silakan klik "Mulai Kerjakan!" untuk mulai belajar.`);
      setPassword(""); // Reset password field
    } else {
      toast.error("Password yang Anda masukkan salah! Coba lagi.");
      setPassword(""); // Reset password field
    }
  };

  // Fungsi untuk membuka dialog Akses Gratis
  const openGratisDialog = () => {
    if (haveAccessGratis) {
      setIsGratisDialogOpen(true);
    }
  };

  // Fungsi untuk membuka dialog Akses Premium
  const openPremiumDialog = () => {
    if (haveAccessPremium) {
      setIsPremiumDialogOpen(true);
    }
  };

  return (
    <div>
      {/* Tombol Akses Gratis */}
      <button
        className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${haveAccessGratis ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
        onClick={openGratisDialog}
        disabled={!haveAccessGratis}
      >
        {haveAccessGratis ? "Mulai Belajar Gratis" : "Akses Gratis Anda Sudah Habis"}
      </button>

      {/* Tombol Akses Premium */}
      <button
        className={`relative mt-3 w-full py-2 font-semibold rounded-full text-sm transition duration-200 z-10 ${haveAccessPremium ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
        onClick={openPremiumDialog}
        disabled={!haveAccessPremium}
      >
        {haveAccessPremium ? "Mulai Belajar Premium" : "Anda Belum Memiliki Akses Premium"}
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
            <Button variant="default" onClick={handlePasswordSubmit} disabled={isPasswordCorrect}>
              Cek Password
            </Button>

            {/* Tombol Mulai Kerjakan, hanya muncul setelah password benar */}
            {isPasswordCorrect && (
              <Button variant="default" onClick={() => toast.success("Mulai Belajar Gratis")}>
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
            <DialogTitle>Akses Premium</DialogTitle>
            <DialogDescription>Anda berhasil mendapatkan akses premium!</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsPremiumDialogOpen(false)}>
                Tutup
              </Button>
            </DialogClose>
            <Button variant="default" onClick={() => toast.success("Akses Premium Diterima")}>
              Mulai Belajar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessButtonWithModal;
