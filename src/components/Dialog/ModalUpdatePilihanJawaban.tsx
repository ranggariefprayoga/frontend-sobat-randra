"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MathEditor from "../MathEditor/MathEditor";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { useUpdateQuestionChoice } from "@/lib/api/questionChoice.api";
import { UpdateQuestionChoiceRequest, QuestionChoiceResponse } from "@/model/questionChoice.model";
import { Pencil } from "lucide-react";

interface Props {
  product_try_out_id: number | string;
  questionId: number;
  questionChoiceId: number;
  questionCategory: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export type QuestionChoicePayload = {
  product_try_out_id: number;
  questionId?: number;
  questionChoiceId: number;
  data: UpdateQuestionChoiceRequest;
  files?: File[];
};

export default function UpdateQuestionChoiceModal({ product_try_out_id, questionId, questionChoiceId, questionCategory, onSuccess, onCancel }: Props) {
  const defaultEditorMode = questionCategory === "TIU" ? "math" : "text";
  const [editorMode, setEditorMode] = useState<"text" | "math">(defaultEditorMode);
  const [open, setOpen] = useState(false);
  const [choiceText, setChoiceText] = useState<string>("");
  const [choiceTextMath, setChoiceTextMath] = useState<string[]>([]);
  const [choiceWeight, setChoiceWeight] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const UpdateChoiceMutation = useUpdateQuestionChoice() as UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> & { isLoading: boolean };

  const { mutateAsync, isLoading } = UpdateChoiceMutation;

  const handleSubmit = async () => {
    if (choiceWeight === null || isNaN(choiceWeight)) {
      toast.error("Bobot pilihan harus berupa angka!");
      return;
    }
    const payload: UpdateQuestionChoiceRequest = {
      question_choice_weighted: choiceWeight,
    };

    // Hanya set text jika ada isi
    if (editorMode === "text" && choiceText.trim()) {
      payload.question_choice_text = choiceText.trim().split("\n");
    }

    // Hanya set math jika ada isi
    if (editorMode === "math" && choiceTextMath.length > 0) {
      payload.question_choice_text_math = choiceTextMath;
    }

    try {
      await mutateAsync({
        product_try_out_id: Number(product_try_out_id),
        questionId: Number(questionId),
        questionChoiceId,
        data: payload,
        files,
      });

      toast.success("Pilihan berhasil diperbarui!");
      setChoiceTextMath([]);
      setChoiceText("");
      setChoiceWeight(0);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Gagal memperbarui pilihan");
      setChoiceTextMath([]);
      setChoiceText("");
      setChoiceWeight(0);
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
        <DialogHeader aria-describedby={undefined}>
          <DialogTitle>Update Pilihan Jawaban</DialogTitle>
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
          <MathEditor onChange={(lines) => setChoiceTextMath(lines)} />
        ) : (
          <>
            <textarea
              rows={4}
              value={choiceText}
              onChange={(e) => setChoiceText(e.target.value)}
              disabled={isLoading}
              placeholder="Masukkan teks pilihan, enter untuk baris baru"
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

        <div className="mb-4">
          <label className="block font-semibold mb-1">Bobot Pilihan *</label>
          <select value={choiceWeight} onChange={(e) => setChoiceWeight(Number(e.target.value))} disabled={isLoading} className="w-full border border-gray-300 rounded-md p-2 text-sm">
            {[0, 1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

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
            {isLoading ? "Menyimpan..." : "Simpan Pilihan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
