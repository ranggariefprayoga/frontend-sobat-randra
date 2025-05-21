"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MathEditor from "../MathEditor/MathEditor";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { useUpdateAnswerExplanation } from "@/lib/api/answerExplanation.api";
import { UpdateAnswerExplanationRequest, AnswerExplanationResponse } from "@/model/answerExplanation.model";
import { Pencil } from "lucide-react";

interface Props {
  product_try_out_id: number | string;
  questionId: number;
  answerExplanationId: number;
  questionCategory: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export type AnswerExplanationPayload = {
  product_try_out_id: number;
  questionId?: number;
  answerExplanationId: number;
  data: UpdateAnswerExplanationRequest;
  files?: File[];
};

export default function UpdateAnswerExplanationModal({ product_try_out_id, questionId, answerExplanationId, questionCategory, onSuccess, onCancel }: Props) {
  const defaultEditorMode = questionCategory === "TIU" ? "math" : "text";
  const [editorMode, setEditorMode] = useState<"text" | "math">(defaultEditorMode);
  const [open, setOpen] = useState(false);

  // State untuk isi teks jawaban penjelasan
  const [explanationText, setExplanationText] = useState<string>("");
  const [explanationTextMath, setExplanationTextMath] = useState<string[]>([]);
  // Files untuk upload gambar
  const [files, setFiles] = useState<File[]>([]);

  const UpdateExplanationMutation = useUpdateAnswerExplanation() as UseMutationResult<WebResponse<AnswerExplanationResponse>, Error, AnswerExplanationPayload> & { isLoading: boolean };

  const { mutateAsync, isLoading } = UpdateExplanationMutation;

  const handleSubmit = async () => {
    // Validasi sederhana, misal harus ada isi text/math atau files
    if (editorMode === "text" && explanationText.trim().length === 0 && files.length === 0) {
      toast.error("Teks penjelasan harus diisi atau upload gambar!");
      return;
    }

    if (editorMode === "math" && explanationTextMath.length === 0) {
      toast.error("Teks matematika penjelasan harus diisi atau upload gambar!");
      return;
    }

    const payload: UpdateAnswerExplanationRequest = {};

    if (editorMode === "text" && explanationText.trim()) {
      // Split berdasarkan baris, sesuaikan sesuai kebutuhan
      payload.answer_explanation_text = explanationText.trim().split("\n");
    }

    if (editorMode === "math" && explanationTextMath.length > 0) {
      payload.answer_explanation_text_math = explanationTextMath;
    }

    try {
      await mutateAsync({
        product_try_out_id: Number(product_try_out_id),
        questionId: Number(questionId),
        answerExplanationId,
        data: payload,
        files,
      });
      toast.success("Penjelasan jawaban berhasil diperbarui!");
      setExplanationText("");
      setExplanationTextMath([]);
      setFiles([]);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Gagal memperbarui penjelasan jawaban");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={isLoading}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Penjelasan Jawaban</DialogTitle>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="mb-4 flex gap-2 items-center">
          <Button variant={editorMode === "text" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("text")} disabled={isLoading}>
            Text
          </Button>
          <Button variant={editorMode === "math" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("math")} disabled={isLoading}>
            Math
          </Button>
        </div>

        {editorMode === "math" ? (
          <MathEditor onChange={(lines) => setExplanationTextMath(lines)} />
        ) : (
          <>
            <textarea
              rows={6}
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
              disabled={isLoading}
              placeholder="Masukkan teks penjelasan, enter untuk baris baru"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm resize-y max-h-[30vh]"
            />
            <div className="mb-4">
              <label className="block font-semibold mb-1">Upload Gambar (opsional)</label>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files) setFiles(Array.from(e.target.files));
                }}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              if (onCancel) onCancel();
            }}
            disabled={isLoading}
            className="mr-2"
          >
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan Penjelasan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
