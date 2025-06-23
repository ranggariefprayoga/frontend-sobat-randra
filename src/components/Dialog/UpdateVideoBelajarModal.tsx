"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ProductVideoBelajarResponse } from "@/model/productVideoBelajar.model";
import { useUpdateVideoBelajarProduct } from "@/lib/api/productVideoBelajar.api";

export function UpdateProductVideoBelajarModal({ initialData }: { initialData?: ProductVideoBelajarResponse }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [marketingText, setMarketingText] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [linkToProduct, setLinkToProduct] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setIsActive(initialData.is_active || false);
      setDescription(initialData.description || "");
      setMarketingText(initialData.marketing_text || "");
      setPrice(initialData.price?.toString() || "");
      setOldPrice(initialData.old_price?.toString() || "");
      setLinkToProduct(initialData.link_to_product || "");
    }
  }, [initialData]);

  const updateMutation = useUpdateVideoBelajarProduct();

  const handleSubmit = async () => {
    if (!bannerImage && !initialData?.banner_image) return toast.error("Mohon unggah gambar banner terlebih dahulu.");

    const payloadData = {
      name,
      is_active: isActive,
      description,
      marketing_text: marketingText || "",
      price: Number(price),
      old_price: oldPrice ? Number(oldPrice) : 0,
      banner_image: "",
      link_to_product: linkToProduct,
    };

    if (initialData?.id) {
      updateMutation.mutate(
        { product_video_belajar_id: initialData.id, data: payloadData, banner_image: bannerImage },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success("Video Belajar berhasil diperbarui.");
          },
          onError: () => {
            toast.error("Gagal memperbarui Video Belajar.");
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Video Belajar Premium</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Video Belajar Premium</DialogTitle>
          <DialogDescription>Perbarui informasi Video Belajar di bawah ini.</DialogDescription>
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
          <div className="mb-4 space-y-1.5">
            <Label>Gambar Banner {initialData?.banner_image ? "(Kosongkan jika tidak diubah)" : <span className="text-red-600">*</span>}</Label>
            <Input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files?.[0] || null)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Deskripsi Video Belajar<span className="text-red-600">*</span>
            </Label>
            <Textarea placeholder="Tulis deskripsi produk..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>Teks Pemasaran (Opsional)</Label>
            <Textarea placeholder="Tulis teks pemasaran jika ada..." value={marketingText} onChange={(e) => setMarketingText(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Link ke produk<span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Masukkan link ke Mayar atau Lynk.id" value={linkToProduct} onChange={(e) => setLinkToProduct(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Harga<span className="text-red-600">*</span>
            </Label>
            <Input type="number" placeholder="Contoh: 50000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>Harga Lama (Opsional)</Label>
            <Input type="number" placeholder="Contoh: 75000" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          </div>

          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProductVideoBelajarModal;
