"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { createTryOutResponse } from "@/model/product.model";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PasswordDisplay } from "@/components/ShowPasswordProduct/PasswordDisplay";
import { UserDetailInterface } from "@/model/user.model";
import { useCheckAvailablePremium } from "@/lib/api/quisSession.api";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props = {
  product?: createTryOutResponse | undefined;
  user?: UserDetailInterface | undefined;
  isFreeAvailable?: boolean;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailTO({ product, user, isFreeAvailable }: Props) {
  const [isGratisDialogOpen, setIsGratisDialogOpen] = useState(false);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const { data: isPremiumAvailable, isLoading } = useCheckAvailablePremium(product?.id ?? "", user?.email ?? "");

  const haveAccessGratis = isFreeAvailable;
  const haveAccessPremium = isPremiumAvailable?.data;
  const correctPassword = product?.password;
  if (!product) return <ProdukBelumTersedia />;

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Loading...</div>;
  }

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
    toast.success(`Try Out dimulai gratis, tunggu sebentar...`);
    setIsGratisDialogOpen(false);
    setPassword("");
    setIsPasswordCorrect(false);
  };

  const discount = product.old_price && product.old_price > product.price && product.old_price > 0 ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : null;

  const whatsappMessage = `https://wa.me/628774867857?text=Halo%20min%2C%20aku%20mau%20pesen%20${encodeURIComponent(product.name)}`;

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
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{product.description}</p>

          {product.is_trial_product && product.password && !isPremiumAvailable?.data && (
            <Button
              className={`relative w-full lg:w-1/3 font-semibold text-xs sm:text-sm transition duration-200 z-10 ${haveAccessGratis ? "bg-[#ad0a1f] text-white hover:bg-[#d7263d]" : "bg-gray-500 text-white cursor-not-allowed"}`}
              onClick={openGratisDialog}
              disabled={!haveAccessGratis}
            >
              {haveAccessGratis ? "Coba Try Out Gratis" : "Akses Gratis Tidak Ada Lagi"}
            </Button>
          )}

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
                  {product.old_price !== undefined && product.old_price > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                      {product.old_price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-[#ad0a1f]">Rp {product.price.toLocaleString("id-ID")}</p>
              </div>

              {/* CTA WhatsApp */}
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="block w-full md:max-w-xs">
                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Beli Paket Premium</Button>
              </a>
            </>
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
