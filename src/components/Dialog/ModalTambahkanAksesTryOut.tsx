/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateTryOutAccess } from "@/lib/api/tryOutAccess.api";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import axios from "axios";

interface CreateTryOutAccessModalProps {
  product_try_out_id: number;
  onSuccess?: () => void;
}

export default function CreateTryOutAccessModal({ product_try_out_id, onSuccess }: CreateTryOutAccessModalProps) {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const createMutation = useCreateTryOutAccess();

  const handleSubmit = async () => {
    if (!userEmail.trim()) {
      toast.error("Email user harus diisi");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      toast.error("Nomor telepon tidak valid");
      return;
    }

    try {
      await createMutation.mutateAsync({
        product_try_out_id: product_try_out_id,
        user_email: userEmail.trim(),
        phone_number: phoneNumber.trim(),
      });
      toast.success("Akses try out berhasil ditambahkan");
      setOpen(false);
      setUserEmail("");
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      let message = "Gagal menambahkan akses";

      // Cek jika error dari axios
      if (axios.isAxiosError(error)) {
        // Ambil pesan error dari response jika ada
        if (error.response?.data) {
          const data = error.response.data as any;
          // Cek properti message string atau bisa juga array pesan error
          if (typeof data.message === "string") {
            message = data.message;
          } else if (Array.isArray(data.message) && data.message.length > 0) {
            message = data.message[0];
          } else if (typeof data.error === "string") {
            message = data.error;
          }
        } else if (error.message) {
          message = error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      setUserEmail("");
      setPhoneNumber("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="inline-flex items-center gap-2">
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Akses Try Out</DialogTitle>
          <DialogDescription>Masukkan email user untuk diberikan akses.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input id="user_email" type="email" placeholder="andra@gmail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} autoFocus disabled={createMutation.isPending} />
        </div>
        <div className="space-y-4">
          <Input
            id="phone_number"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0877xxxxxxx"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhoneNumber(value); // hanya simpan angka dalam bentuk string
              }
            }}
            disabled={createMutation.isPending}
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={createMutation.isPending}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={createMutation.isPending || userEmail === "" || phoneNumber === ""}>
            {createMutation.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
