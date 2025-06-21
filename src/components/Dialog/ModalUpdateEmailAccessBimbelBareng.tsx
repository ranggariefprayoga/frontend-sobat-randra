"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit2 } from "lucide-react";
import { useUpdateBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";
interface UpdateUserEmailModalProps {
  productBimbelBarengId: number;
  accessId: number;
  currentEmail: string | undefined;
  onSuccess: () => void;
}

export default function UpdateUserEmailModalForBimbelBareng({ productBimbelBarengId, accessId, currentEmail, onSuccess }: UpdateUserEmailModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setEmail(currentEmail); // update saat currentEmail berubah
  }, [currentEmail]);

  const updateMutation = useUpdateBimbelBarengAccess();

  const handleSave = async () => {
    if (!email) return;
    if (!email.trim()) {
      toast.error("Email harus diisi");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      toast.error("Nomor telepon tidak valid");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        bimbel_bareng_access_id: accessId,
        product_bimbel_bareng_id: productBimbelBarengId,
        data: { user_email: email.trim(), phone_number: phoneNumber.trim() },
      });
      toast.success("Email berhasil diupdate");
      setEmail("");
      setPhoneNumber("");
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Gagal update email");
      setEmail("");
      setPhoneNumber("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="inline-flex items-center gap-2">
          <Edit2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Email User</DialogTitle>
          <DialogDescription>Masukkan email baru untuk user ini.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Input type="email" placeholder="andra@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus disabled={updateMutation.isPending} />
        </div>
        <div className="space-y-4">
          <Input
            id="phone_number"
            type="text"
            inputMode="numeric" // ← agar hanya muncul keypad angka di mobile
            pattern="[0-9]*" // ← bantu validasi angka
            placeholder="0877xxxxxxx"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhoneNumber(value); // tetap string tapi hanya angka
              }
            }}
            disabled={updateMutation.isPending}
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={updateMutation.isPending}>
            Batal
          </Button>
          <Button onClick={handleSave} disabled={updateMutation.isPending || email === ""}>
            {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
