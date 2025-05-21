"use client";

import React, { useState } from "react";
import { useDeleteAnswerExplanationById } from "@/lib/api/answerExplanation.api";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  product_try_out_id: number;
  questionId: number;
  answerExplanationId: number;
  onDeleted?: () => void;
}

export default function DeleteAnswerExplanationModal({ product_try_out_id, questionId, answerExplanationId, onDeleted }: Props) {
  const [open, setOpen] = useState(false);

  const DeleteExplanationMutation = useDeleteAnswerExplanationById() as UseMutationResult<WebResponse<string>, Error, { product_try_out_id: number; questionId: number; answerExplanationId: number }> & { isLoading: boolean };

  const { mutateAsync, isLoading } = DeleteExplanationMutation;

  const handleDelete = async () => {
    try {
      await mutateAsync({ product_try_out_id, questionId, answerExplanationId });
      toast.success("Penjelasan jawaban berhasil dihapus!");
      setOpen(false);
      if (onDeleted) onDeleted();
    } catch {
      toast.error("Gagal menghapus penjelasan jawaban");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading} title="Hapus Penjelasan Jawaban">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
        </DialogHeader>
        <p>Apakah kamu yakin ingin menghapus penjelasan jawaban ini? Tindakan ini tidak dapat dibatalkan.</p>
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
