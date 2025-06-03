"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createTryOutResponse } from "@/model/product.model";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PasswordDisplay } from "@/components/ShowPasswordProduct/PasswordDisplay";
import { UserDetailInterface } from "@/model/user.model";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props = {
  product?: createTryOutResponse | undefined;
  user?: UserDetailInterface | undefined;
  isFreeAvailable?: boolean;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailTOFree({ product, isFreeAvailable }: Props) {
  const [isGratisDialogOpen, setIsGratisDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const haveAccessGratis = isFreeAvailable;
  const correctPassword = product?.password;
  if (!product) return <ProdukBelumTersedia />;

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

  const handleGratisSubmit = () => {
    toast.success(`Try Out dimulai gratis, tunggu sebentar...`);
    setIsGratisDialogOpen(false);
    setPassword("");
    setIsPasswordCorrect(false);
  };

  return (
    <div className="w-full mx-auto px-8 md:px-24 mt-8">
      {/* Konten */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Banner */}
        <div className="relative w-full md:w-[45%] aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
          {product.banner_image ? (
            <Image src={product.banner_image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">Gambar tidak tersedia</div>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col md:w-[55%] w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">{product.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {!product.is_active && <Badge>📘 Tidak Aktif</Badge>}
            {product.is_trial_product && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Gratis</span>}
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{product.description}</p>

          {product.is_trial_product && product.password && (
            <Button
              className={`relative w-full lg:w-1/3 font-semibold text-xs sm:text-sm transition duration-200 z-10 ${haveAccessGratis ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
              onClick={openGratisDialog}
              disabled={!haveAccessGratis}
            >
              {haveAccessGratis ? "Coba Try Out Gratis" : "Try Out Gratis Tidak Ada Lagi"}
            </Button>
          )}
        </div>
      </div>

      {/* Marketing Text - bawah */}
      {product.marketing_text && product.marketing_text !== "" && (
        <div className="mt-10 bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ad0a1f] uppercase mb-2">Tentang Paket</h1>
          {product.marketing_text}
        </div>
      )}

      <Dialog open={isGratisDialogOpen} onOpenChange={setIsGratisDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Akses Gratis</DialogTitle>
            <DialogDescription>
              Masukkan password untuk mendapatkan akses gratis. <PasswordDisplay password={product?.password} />
            </DialogDescription>
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
    </div>
  );
}
