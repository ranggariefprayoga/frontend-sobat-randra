/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";
import Image from "next/image";
import { QuestionChoiceResponse } from "@/model/questionChoice.model";

type QuestionChoicePreviewProps = {
  isLoading: boolean;
  error?: any;
  data?: QuestionChoiceResponse[];
};

export default function QuestionChoicePreview({ isLoading, error, data }: QuestionChoicePreviewProps) {
  if (isLoading) return <p className="text-sm text-gray-500">Memuat pilihan jawaban...</p>;
  if (error) return <p className="text-sm text-red-600">Gagal memuat pilihan.</p>;
  if (!data || data.length === 0) return <p className="text-sm text-gray-400">Belum ada pilihan jawaban.</p>;

  return (
    <div className="mb-4 space-y-4">
      {data.map((choice) => (
        <div key={choice.id} className="border rounded-md p-4 bg-white shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Pilihan {choice.question_choice_title}</span>
            <span className="text-xs text-gray-500">Bobot: {choice.question_choice_weighted}</span>
          </div>

          {/* Teks Pilihan */}
          {choice.question_choice_text.length > 0 && (
            <div className="space-y-1 text-sm">
              {choice.question_choice_text.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

          {/* Math Pilihan */}
          {choice.question_choice_text_math.length > 0 && (
            <div className="text-base sm:text-xl w-full">
              {choice.question_choice_text_math.map((math, i) => (
                <div key={i} className="mb-2 text-base sm:text-xl ">
                  <LatexRenderer latexStrings={[math]} />
                </div>
              ))}
            </div>
          )}

          {/* Gambar Pilihan */}
          {choice.question_choice_images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {choice.question_choice_images.map((src, i) => (
                <Image key={i} width={100} height={100} src={src} alt={`Gambar pilihan ${choice.question_choice_title} - ${i + 1}`} className="rounded border" />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
