/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteQuestionById } from "@/lib/api/question.api";
import { toast } from "sonner";

type DeleteQuestionButtonProps = {
  productId: number;
  questionId: number;
  onDeleted?: () => void;
};

export default function DeleteQuestionButton({ productId, questionId, onDeleted }: DeleteQuestionButtonProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isLoading }: any = useDeleteQuestionById();
  const handleDelete = async () => {
    try {
      await mutateAsync({ productId, questionId });
      toast.success("Soal berhasil dihapus");
      setOpen(false);
      if (onDeleted) onDeleted();
    } catch (error: any) {
      toast.error(error?.message || "Gagal menghapus soal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Hapus Soal
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Soal</DialogTitle>
        </DialogHeader>
        <p>Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading || questionId === 0}>
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
