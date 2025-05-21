"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuestionResponse, UpdateQuestionRequest } from "@/model/question.model";
import { toast } from "sonner";
import MathEditor from "../MathEditor/MathEditor";
import { QuestionPayload, useUpdateQuestion } from "@/lib/api/question.api";
import { UseMutationResult } from "@tanstack/react-query";
import { WebResponse } from "@/model/web-reponse.model";
import { Pencil } from "lucide-react";

interface Props {
  product_try_out_id: number | string;
  data: QuestionResponse;
  onSuccess?: () => void;
  handleRefetchQuestion?: () => void;
}

export default function UpdateQuestionModal({ product_try_out_id, data, onSuccess, handleRefetchQuestion }: Props) {
  const [open, setOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"text" | "math">(data?.category === "TIU" ? "math" : "text");
  const [questionText, setQuestionText] = useState<string>("");
  const [questionTextMath, setQuestionTextMath] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const UpdateQuestionMutation = useUpdateQuestion() as UseMutationResult<WebResponse<QuestionResponse>, Error, QuestionPayload> & { isLoading: boolean };
  const { mutateAsync, isLoading: isUpdatingQuestion } = UpdateQuestionMutation;

  const handleSubmit = async () => {
    if (editorMode === "math" && questionTextMath.length === 0) {
      toast.error("Masukkan soal terlebih dahulu!");
      return;
    }

    const payload: UpdateQuestionRequest = {};

    if (editorMode === "math") {
      payload.question_text_math = questionTextMath;
    } else {
      payload.question_text = questionText.split("\n");
    }

    try {
      await mutateAsync({
        product_try_out_id: product_try_out_id,
        questionId: data.id,
        data: payload,
        files,
      } as QuestionPayload);
      toast.success("Soal berhasil dibuat!");
      if (handleRefetchQuestion) {
        handleRefetchQuestion();
      }
      setOpen(false);
      setQuestionTextMath([]);
      setQuestionText("");
      if (onSuccess) onSuccess();
    } catch {
      setQuestionTextMath([]);
      setQuestionText("");
      toast.error("Gagal membuat soal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-7xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            Update Soal Nomor {data?.number_of_question} - {data?.category}
          </DialogTitle>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <div className="mb-2 flex gap-2 items-center">
          <Button variant={editorMode === "text" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("text")} disabled={isUpdatingQuestion}>
            Text
          </Button>
          <Button variant={editorMode === "math" ? "default" : "outline"} size="sm" onClick={() => setEditorMode("math")} disabled={isUpdatingQuestion}>
            Math
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
              disabled={isUpdatingQuestion}
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
                disabled={isUpdatingQuestion}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUpdatingQuestion} className="mr-2">
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdatingQuestion}>
            {isUpdatingQuestion ? "Menyimpan..." : "Simpan Soal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
