"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateQuestion } from "@/lib/api/question.api";
import { CreateQuestionRequest, QuestionResponse } from "@/model/question.model";
import { toast } from "sonner";
import MathEditor from "../MathEditor/MathEditor";
import { CreateQuestionArgs } from "@/lib/api/question.api";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";

interface Props {
  productId: number | string;
  category: "TWK" | "TIU" | "TKP";
  validQuestions: number[];
  questionRanges: { start: number; end: number };
  onSuccess?: () => void;
}

export default function CreateQuestionModal({ productId, category, validQuestions, questionRanges, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number | null>(null);
  const [editorMode, setEditorMode] = useState<"text" | "math">(category === "TIU" ? "math" : "text");
  const [questionText, setQuestionText] = useState<string>("");
  const [questionTextMath, setQuestionTextMath] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const mutation = useCreateQuestion() as UseMutationResult<WebResponse<QuestionResponse>, Error, CreateQuestionArgs> & { isLoading: boolean };
  const { mutateAsync, isLoading } = mutation;

  const availableNumbers = React.useMemo(() => {
    const nums: number[] = [];
    for (let i = questionRanges.start; i <= questionRanges.end; i++) {
      if (!validQuestions.includes(i)) nums.push(i);
    }
    return nums;
  }, [validQuestions, questionRanges]);

  useEffect(() => {
    if (open) {
      setNumberOfQuestion(null);
      setQuestionText("");
      setQuestionTextMath([]);
      setFiles([]);
      setEditorMode(category === "TIU" ? "math" : "text");
    }
  }, [open, category]);

  const handleSubmit = async () => {
    if (!numberOfQuestion) {
      toast.error("Pilih nomor soal!");
      return;
    }

    if (editorMode === "math" && questionTextMath.length === 0) {
      toast.error("Masukkan soal pada Math Editor!");
      return;
    }

    if (editorMode === "text" && questionText.trim() === "") {
      toast.error("Masukkan soal teks!");
      return;
    }

    const payload: CreateQuestionRequest = {
      product_try_out_id: Number(productId),
      number_of_question: numberOfQuestion,
      category,
    };

    if (editorMode === "math") {
      payload.question_text_math = questionTextMath;
    } else {
      payload.question_text = questionText.split("\n");
    }

    try {
      await mutateAsync({
        productId,
        data: payload,
        files,
      } as CreateQuestionArgs);
      toast.success("Soal berhasil dibuat!");
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Gagal membuat soal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Buat Soal Baru</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-7xl max-h-[80vh] overflow-auto w-full">
        <DialogHeader>
          <DialogTitle>Buat Soal Baru - Kategori {category}</DialogTitle>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="mb-2">
          <label className="block mb-2 font-semibold">Nomor Soal</label>
          <select className="w-full border border-gray-300 rounded-md p-2" value={numberOfQuestion ?? ""} onChange={(e) => setNumberOfQuestion(Number(e.target.value))} disabled={isLoading}>
            <option value="" disabled>
              Pilih nomor soal
            </option>
            {availableNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2 flex gap-4 items-center">
          <Button variant={editorMode === "text" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("text")} disabled={isLoading}>
            Text Editor
          </Button>
          <Button variant={editorMode === "math" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("math")} disabled={isLoading}>
            Math Editor
          </Button>
        </div>

        {editorMode === "math" ? (
          <>
            <MathEditor onChange={(lines) => setQuestionTextMath(lines)} />
          </>
        ) : (
          <>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-md p-2 mb-3 max-h-[50vh] overflow-auto"
              placeholder="Masukkan teks soal, gunakan enter untuk baris baru"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              disabled={isLoading}
            />

            <div className="mb-2">
              <label className="block mb-2 font-semibold">Upload Gambar (opsional)</label>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading} className="mr-2">
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan Soal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
