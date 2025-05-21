"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MathEditor from "../MathEditor/MathEditor";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { useCreateQuestionChoice } from "@/lib/api/questionChoice.api";
import { CreateQuestionChoiceRequest, QuestionChoiceResponse } from "@/model/questionChoice.model";

interface Props {
  product_try_out_id: number | string;
  questionId: number;
  questionCategory?: string; // contoh: "TIU" atau lainnya
  existingChoices?: string[];
  isLoadingChoices?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export type QuestionChoicePayload = {
  product_try_out_id: number;
  questionId?: number;
  data: CreateQuestionChoiceRequest;
  files?: File[];
};

export default function CreateQuestionChoiceModal({ product_try_out_id, questionId, existingChoices = [], isLoadingChoices = false, onSuccess, onCancel, questionCategory }: Props) {
  const defaultEditorMode = questionCategory === "TIU" ? "math" : "text";
  const [editorMode, setEditorMode] = useState<"text" | "math">(defaultEditorMode);
  const [open, setOpen] = useState(false);
  const [choiceTitle, setChoiceTitle] = useState<string>("");
  const [choiceText, setChoiceText] = useState<string>("");
  const [choiceTextMath, setChoiceTextMath] = useState<string[]>([]);
  const [choiceWeight, setChoiceWeight] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const CreateChoiceMutation = useCreateQuestionChoice() as UseMutationResult<WebResponse<QuestionChoiceResponse>, Error, QuestionChoicePayload> & { isLoading: boolean };

  const { mutateAsync, isLoading } = CreateChoiceMutation;

  const allChoices = ["A", "B", "C", "D", "E"];
  const availableChoices = allChoices.filter((choice) => !existingChoices.includes(choice));

  const handleSubmit = async () => {
    if (choiceTitle.length === 0) {
      toast.error("Pilihan jawaban harus dipilih!");
      return;
    }
    if (editorMode === "math" && choiceTextMath.length === 0) {
      toast.error("Masukkan teks soal matematika terlebih dahulu!");
      return;
    }

    if (choiceWeight === null || isNaN(choiceWeight)) {
      toast.error("Bobot pilihan harus berupa angka!");
      return;
    }

    const payload: CreateQuestionChoiceRequest = {
      question_choice_title: choiceTitle,
      question_choice_weighted: choiceWeight,
      question_choice_text: editorMode === "text" ? choiceText.trim().split("\n") : undefined,
      question_choice_text_math: editorMode === "math" ? choiceTextMath : undefined,
    };

    try {
      await mutateAsync({
        product_try_out_id: Number(product_try_out_id),
        questionId: Number(questionId),
        data: payload,
        files,
      });

      toast.success("Pilihan berhasil dibuat!");
      setChoiceTextMath([]);
      setChoiceText("");
      setChoiceWeight(0);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Gagal membuat pilihan");
      setChoiceTextMath([]);
      setChoiceText("");
      setChoiceWeight(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2" disabled={isLoading || isLoadingChoices || availableChoices.length === 0} title={availableChoices.length === 0 ? "Semua pilihan sudah digunakan" : undefined}>
          Tambah Pilihan Jawaban
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Pilihan Baru</DialogTitle>
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

        <div className="mb-4">
          <label className="block font-semibold mb-1">Judul Pilihan</label>
          <select value={choiceTitle} onChange={(e) => setChoiceTitle(e.target.value)} disabled={isLoading || isLoadingChoices || availableChoices.length === 0} className="w-full border border-gray-300 rounded-md p-2 text-sm">
            <option value="">{isLoadingChoices ? "Memuat pilihan..." : availableChoices.length === 0 ? "Semua pilihan sudah digunakan" : "Pilih Judul Pilihan"}</option>
            {availableChoices.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
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
