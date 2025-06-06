"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MathEditor from "../MathEditor/MathEditor";
import { toast } from "sonner";
import { useCreateAnswerExplanation } from "@/lib/api/answerExplanation.api";
import { CreateAnswerExplanationRequest, AnswerExplanationResponse } from "@/model/answerExplanation.model";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { FileText } from "lucide-react";

interface Props {
  product_try_out_id: number | string;
  questionId: number | string;
  questionCategory?: string;
  existingAnswerExplanation?: AnswerExplanationResponse[];
  isLoadingAnswerExplanation?: boolean;
  onCreated?: () => void;
  onCancel?: () => void;
}

export default function CreateAnswerExplanationModal({ product_try_out_id, questionId, questionCategory, existingAnswerExplanation = [], isLoadingAnswerExplanation = false, onCreated }: Props) {
  const defaultMode = questionCategory === "TIU" ? "math" : "text";
  const [editorMode, setEditorMode] = useState<"text" | "math">(defaultMode);
  const [open, setOpen] = useState(false);
  const [textInput, setTextInput] = useState<string>("");
  const [mathInput, setMathInput] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const mutation = useCreateAnswerExplanation() as UseMutationResult<
    WebResponse<AnswerExplanationResponse>,
    Error,
    {
      product_try_out_id: number | string;
      questionId: number | string;
      data: CreateAnswerExplanationRequest;
      files?: File[];
    }
  > & { isLoading: boolean };

  useEffect(() => {
    if (open) {
      setEditorMode(defaultMode);
      setTextInput("");
      setMathInput([]);
      setFiles([]);
    }
  }, [open, defaultMode]);

  const handleSubmit = async () => {
    const payload: CreateAnswerExplanationRequest = {};

    if (editorMode === "text") {
      payload.answer_explanation_text = textInput.split("\n");
    } else {
      if (mathInput.length === 0) {
        toast.error("Masukkan penjelasan matematika terlebih dahulu!");
        return;
      }
      payload.answer_explanation_text_math = mathInput;
    }

    try {
      await mutation.mutateAsync({
        product_try_out_id,
        questionId,
        data: payload,
        files,
      });

      toast.success("Penjelasan berhasil ditambahkan!");
      if (onCreated) onCreated();
      setFiles([]);
      setOpen(false);
    } catch {
      setFiles([]);
      toast.error("Gagal menyimpan penjelasan!");
    }
  };

  const isDisabled = isLoadingAnswerExplanation || (existingAnswerExplanation?.length ?? 0) >= 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isDisabled} title={isDisabled ? "Sudah ada penjelasan untuk soal ini" : ""}>
          <FileText />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Penjelasan Jawaban</DialogTitle>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="mb-4 flex gap-2 items-center">
          <Button variant={editorMode === "text" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("text")}>
            Text
          </Button>
          <Button variant={editorMode === "math" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("math")}>
            Math
          </Button>
        </div>

        {editorMode === "math" ? (
          <MathEditor onChange={(lines) => setMathInput(lines)} />
        ) : (
          <>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-md p-2 mb-3 max-h-[50vh] overflow-auto"
              placeholder="Masukkan teks penjelasan, gunakan enter untuk baris baru"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
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
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isLoading}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={mutation.isLoading}>
            {mutation.isLoading ? "Menyimpan..." : "Simpan Penjelasan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
