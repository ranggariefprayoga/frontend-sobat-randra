/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";
import { QuestionResponse } from "@/model/question.model";

type QuestionPreviewProps = {
  isLoading: boolean;
  error?: any;
  data?: QuestionResponse;
};

export default function QuestionPreview({ isLoading, error, data }: QuestionPreviewProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const mathContents = data?.question_text_math?.flatMap((item) => item) || [];

  return (
    <div className="mb-4">
      {isLoading && <p>Loading soal...</p>}

      {!isLoading && error && <p className="text-red-600">Gagal memuat soal</p>}

      {!isLoading && !data && <p className="text-gray-500">Data soal tidak ditemukan.</p>}

      {!isLoading && data && (
        <div className="space-y-4">
          {/* Teks Soal */}
          {Array.isArray(data.question_text) && data.question_text.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Soal (Teks):</h4>
              {data.question_text.map((line: string, idx: number) => (
                <p key={idx} className="mb-1">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Math Soal */}
          {mathContents.length > 0 && (
            <div ref={mathRef} className="text-sm sm:text-base">
              {mathContents.map((expression, index) => (
                <div key={index} className="mb-2">
                  <LatexRenderer latexStrings={[expression]} />
                </div>
              ))}
            </div>
          )}

          {/* Gambar Soal */}
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
  );
}
