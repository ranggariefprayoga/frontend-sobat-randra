/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuestionResponse } from "@/model/question.model";
import { WebResponse } from "@/model/web-reponse.model";
import MathRenderer from "../Math/MathRenderer";

type Props = {
  open: boolean;
  onClose: () => void;
  activeNumber: number | null;
  isLoading: boolean;
  error?: any;
  questionDetail?: WebResponse<QuestionResponse>;
};

export default function PreviewQuestionDialog({ open, onClose, activeNumber, isLoading, error, questionDetail }: Props) {
  const data = questionDetail?.data;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Preview Soal Nomor {activeNumber}</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          {isLoading && <p>Loading soal...</p>}

          {!isLoading && error && <p className="text-red-600">Gagal memuat soal</p>}

          {!isLoading && !data && <p className="text-gray-500">Data soal tidak ditemukan.</p>}

          {!isLoading && data && (
            <div className="space-y-4">
              {Array.isArray(data.question_text) && data.question_text.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Soal (Teks):</h4>
                  {data.question_text.map((line, idx) => (
                    <p key={idx} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {Array.isArray(data.question_text_math) && data.question_text_math.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Soal (Math):</h4>
                  <MathRenderer lines={data.question_text_math} />
                </div>
              )}

              {Array.isArray(data.question_images) && data.question_images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Gambar:</h4>
                  <div className="flex flex-wrap gap-4">
                    {data.question_images.map((src: string, idx: number) => (
                      <img key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="max-w-[150px] rounded border" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
