"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useDeleteBimbelBarengAccessById } from "@/lib/api/productBimbelBarengAccess.api";

interface DeleteBimbelBarengAccessModalProps {
  product_bimbel_bareng_id: number;
  accessId: number | null;
  onDeleted?: () => void;
}

export default function ModalHapusBimbelBarengAkses({ product_bimbel_bareng_id, accessId, onDeleted }: DeleteBimbelBarengAccessModalProps) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteBimbelBarengAccessById();

  const handleDelete = async () => {
    if (accessId === null) return;
    try {
      await deleteMutation.mutateAsync({ bimbel_bareng_access_id: accessId, product_bimbel_bareng_id: product_bimbel_bareng_id });
      toast.success("Akses bimbel bareng berhasil dihapus");
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
          <DialogDescription>Apakah Anda yakin ingin menghapus akses bimbel bareng ini?</DialogDescription>
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
