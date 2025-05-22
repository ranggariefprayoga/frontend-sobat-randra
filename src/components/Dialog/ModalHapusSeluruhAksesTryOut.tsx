"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTryOutAccess } from "@/lib/api/tryOutAccess.api";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteTryOutAccessModalProps {
  product_try_out_id: number;
  accessId: number | null;
  onDeleted?: () => void;
}

export default function DeleteTryOutAccessModal({ product_try_out_id, accessId, onDeleted }: DeleteTryOutAccessModalProps) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteTryOutAccess();

  const handleDelete = async () => {
    if (accessId === null) return;
    try {
      await deleteMutation.mutateAsync({ id: accessId, product_try_out_id: product_try_out_id });
      toast.success("Akses try out berhasil dihapus");
      setOpen(false);
      if (onDeleted) onDeleted();
    } catch {
      toast.error("Gagal menghapus akses");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="inline-flex items-center gap-2" disabled={accessId === null}>
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Akses</DialogTitle>
          <DialogDescription>Apakah Anda yakin ingin menghapus akses try out ini?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={deleteMutation.isPending}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
