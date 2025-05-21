"use client";

import React, { useState } from "react";
import { useDeleteQuestionChoiceById } from "@/lib/api/questionChoice.api";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  product_try_out_id: number;
  questionId: number;
  questionChoiceId: number;
  onDeleted?: () => void;
}

export default function DeleteQuestionChoiceModal({ product_try_out_id, questionId, questionChoiceId, onDeleted }: Props) {
  const [open, setOpen] = useState(false);

  const DeleteChoiceMutation = useDeleteQuestionChoiceById() as UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number; questionChoiceId: number }> & { isLoading: boolean };

  const { mutateAsync, isLoading } = DeleteChoiceMutation;

  const handleDelete = async () => {
    try {
      await mutateAsync({ product_try_out_id, questionId, questionChoiceId });
      toast.success("Pilihan berhasil dihapus!");
      setOpen(false);
      if (onDeleted) onDeleted();
    } catch {
      toast.error("Gagal menghapus pilihan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader aria-describedby={undefined}>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
        </DialogHeader>
        <p>Apakah kamu yakin ingin menghapus pilihan jawaban ini? Tindakan ini tidak bisa dibatalkan.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
