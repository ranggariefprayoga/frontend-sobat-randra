/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";
import { QuestionResponse } from "@/model/question.model";
import Image from "next/image";

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
          <div className="flex flex-col gap-2">
            {/* Teks Soal */}
            {Array.isArray(data.question_text) && data.question_text.length > 0 && (
              <div>
                {data.question_text.map((line: string, idx: number) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}

            {/* Gambar Soal */}
            {Array.isArray(data.question_images) && data.question_images.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-4">
                  {data.question_images.map((src: string, idx: number) => (
                    <Image key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-3/4 rounded border" width={800} height={450} style={{ objectFit: "contain" }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Math Soal */}
          {mathContents.length > 0 && (
            <div ref={mathRef} className="text-base sm:text-xl w-full">
              {mathContents.map((expression, index) => (
                <div key={index} className="mb-2 text-base sm:text-xl">
                  <LatexRenderer latexStrings={[expression]} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
