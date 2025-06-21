"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateBimbelBarengProduct } from "@/lib/api/productBimbelBareng.api";

export function BuatBimbelBarengModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [pemateri, setPemateri] = useState("");
  const [jadwalBimbelImage, setJadwalBimbelImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [marketingText, setMarketingText] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [linkToMeeting, setLinkToMeeting] = useState("");
  const [linkToWhatsapp, setLinkToWhatsapp] = useState("");

  const buatProdukBimbelBareng = useCreateBimbelBarengProduct();

  const handleSubmit = async () => {
    if (!bannerImage) return toast.error("Mohon unggah gambar banner terlebih dahulu.");
    if (!jadwalBimbelImage) return toast.error("Mohon unggah gambar jadwal bimbel terlebih dahulu.");
    if (!name) return toast.error("Nama produk belum diisi.");
    if (!description) return toast.error("Deskripsi produk belum diisi.");
    if (!linkToMeeting) return toast.error("Link Zoom meeting produk belum diisi.");
    if (!linkToWhatsapp) return toast.error("Link ke Whatsapp Group produk belum diisi.");
    if (!price) return toast.error("Harga produk belum diisi.");

    const payload = JSON.stringify({
      name,
      is_active: isActive,
      capacity,
      pemateri,
      description,
      marketing_text: marketingText || "",
      price: Number(price),
      old_price: oldPrice ? Number(oldPrice) : 0,
      banner_image: "",
      link_to_meeting: linkToMeeting,
      link_to_whatsapp: linkToWhatsapp,
      jadwal_bimbel_image: "",
    });

    buatProdukBimbelBareng.mutate(
      { data: payload, banner_image: bannerImage, jadwal_bimbel_image: jadwalBimbelImage },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Bimbel Bareng berhasil dibuat.");
          resetForm();
        },
        onError: () => {
          toast.error("Gagal membuat Bimbel Bareng.");
          console.error(buatProdukBimbelBareng.error);
        },
      }
    );
  };

  const resetForm = () => {
    setName("");
    setIsActive(false);
    setBannerImage(null);
    setJadwalBimbelImage(null);
    setPemateri("");
    setCapacity(0);
    setDescription("");
    setMarketingText("");
    setPrice("");
    setOldPrice("");
    setLinkToMeeting("");
    setLinkToWhatsapp("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Buat Bimbel Bareng</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buat Bimbel Bareng</DialogTitle>
          <DialogDescription>Isi form dibawah ini untuk membuat Produk Bimbel Bareng.</DialogDescription>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="space-y-4">
          <div className="mb-4 space-y-1.5">
            <Label>
              Nama Produk<span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Masukkan nama produk" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Kapasitas Peserta <span className="text-red-600">*</span>
            </Label>
            <Input type="number" placeholder="Contoh: 20" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
          </div>
          <div className="mb-4 space-y-1.5">
            <Label>
              Pemateri<span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Masukkan nama pemateri kelas" value={pemateri} onChange={(e) => setPemateri(e.target.value)} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <span className="text-sm">{isActive ? "Aktif" : "Tidak Aktif"}</span>
            </div>
          </div>
          <div className="mb-4 space-y-1.5">
            <Label>
              Gambar Banner <span className="text-red-600">*</span>
            </Label>
            <Input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files?.[0] || null)} />
          </div>
          <div className="mb-4 space-y-1.5">
            <Label>
              Gambar Jadwal Bimbel <span className="text-red-600">*</span>
            </Label>
            <Input type="file" accept="image/*" onChange={(e) => setJadwalBimbelImage(e.target.files?.[0] || null)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Deskripsi Try Out <span className="text-red-600">*</span>
            </Label>
            <Textarea placeholder="Tulis deskripsi produk..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>Teks Pemasaran (Opsional)</Label>
            <Textarea placeholder="Tulis teks pemasaran jika ada..." value={marketingText} onChange={(e) => setMarketingText(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Link ke Grup WhatsApp Bimbel <span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Link ke Grup Whatsapp..." value={linkToWhatsapp} onChange={(e) => setLinkToWhatsapp(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Link ke Zoom Meeting <span className="text-red-600">*</span>
            </Label>
            <Input placeholder="Tulis zoom meeting..." value={linkToMeeting} onChange={(e) => setLinkToMeeting(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>
              Harga <span className="text-red-600">*</span>
            </Label>
            <Input type="number" placeholder="Contoh: 50000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label>Harga Lama (Opsional)</Label>
            <Input type="number" placeholder="Contoh: 75000" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          </div>

          <Button onClick={handleSubmit} disabled={buatProdukBimbelBareng.isPending}>
            {buatProdukBimbelBareng.isPending ? "Membuat..." : "Simpan Produk"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BuatBimbelBarengModal;
