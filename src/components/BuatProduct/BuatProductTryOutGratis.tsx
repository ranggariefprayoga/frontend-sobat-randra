"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTryOutProduct } from "@/lib/api/productTryOut.api";
import { toast } from "sonner";

interface checkFreeProductProps {
  checkFreeProduct: boolean;
}

export function CreateTryOutFreeModal({ checkFreeProduct }: checkFreeProductProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const isFree = true;
  const [password, setPassword] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [marketingText, setMarketingText] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");

  const createMutation = useCreateTryOutProduct();

  const handleSubmit = async () => {
    if (!bannerImage) return toast.error("Mohon unggah gambar banner terlebih dahulu.");
    if (!name) return toast.error("Nama produk belum diisi.");
    if (!description) return toast.error("Deskripsi produk belum diisi.");
    if (!price) return toast.error("Harga produk belum diisi.");

    if (isFree) {
      if (!password) return toast.error("Password gratis belum diisi.");
    }

    const payload = JSON.stringify({
      name,
      is_active: isActive,
      is_trial_product: isFree,
      password: isFree ? password : "",
      description,
      marketing_text: marketingText || "",
      price: Number(price),
      old_price: oldPrice ? Number(oldPrice) : 0,
      banner_image: "",
    });

    createMutation.mutate(
      { data: payload, banner_image: bannerImage },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("TryOut Gratis berhasil dibuat.");
          resetForm();
        },
        onError: () => {
          toast.error("Gagal membuat TryOut Gratis.");
        },
      }
    );
  };

  const resetForm = () => {
    setName("");
    setIsActive(false);
    setPassword("");
    setBannerImage(null);
    setDescription("");
    setMarketingText("");
    setPrice("");
    setOldPrice("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={checkFreeProduct}>Buat TryOut Gratis</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buat TryOut Gratis</DialogTitle>
          <DialogDescription>Isi form dibawah ini untuk membuat TryOut.</DialogDescription>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="space-y-4">
          <div className="mb-4 space-y-1.5">
            <Label>
              Nama Produk<span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Masukkan nama produk" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <span className="text-sm">{isActive ? "Aktif" : "Tidak Aktif"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch checked={isFree} />
              <span className="text-sm">{isFree ? "Ada TryOut Gratis" : "Gak ada TryOut Gratis"}</span>
            </div>
          </div>

          {isFree && (
            <div className="mb-4 space-y-1.5">
              <Label>
                Password Akses<span className="text-red-600">*</span>
              </Label>
              <Input placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          )}

          <div className="mb-4 space-y-1.5">
            <Label>
              Gambar Banner <span className="text-red-600">*</span>
            </Label>
            <Input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files?.[0] || null)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Deskripsi TryOut <span className="text-red-600">*</span>
            </Label>
            <Textarea placeholder="Tulis deskripsi produk..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>Teks Pemasaran (Opsional)</Label>
            <Textarea placeholder="Tulis teks pemasaran jika ada..." value={marketingText} onChange={(e) => setMarketingText(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Harga Asli<span className="text-red-600">*</span>
            </Label>
            <Input type="number" placeholder="Contoh: 50000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <Button onClick={handleSubmit} disabled={createMutation.isPending}>
            {createMutation.isPending ? "Membuat..." : "Simpan Produk"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTryOutFreeModal;
