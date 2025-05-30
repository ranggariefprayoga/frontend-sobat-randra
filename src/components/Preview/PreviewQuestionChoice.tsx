/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";
import Image from "next/image";
import { QuestionChoiceResponse } from "@/model/questionChoice.model";
import { Badge } from "../ui/badge";
import UpdateQuestionChoiceModal from "../Dialog/ModalUpdatePilihanJawaban";
import DeleteQuestionChoiceModal from "../Dialog/ModalHapusPilihanJawaban";

type QuestionChoicePreviewProps = {
  isLoading: boolean;
  error?: any;
  data?: QuestionChoiceResponse[];
  questionCategory: string;
  handleRefecthQuestionChoice: () => void;
};

export default function QuestionChoicePreview({ isLoading, error, data, questionCategory, handleRefecthQuestionChoice }: QuestionChoicePreviewProps) {
  if (isLoading) return <p className="text-sm text-gray-500">Memuat pilihan jawaban...</p>;
  if (error) return <p className="text-sm text-red-600">Gagal memuat pilihan.</p>;
  if (!data || data.length === 0) return <p className="text-sm text-gray-400">Belum ada pilihan jawaban.</p>;

  const order = ["A", "B", "C", "D", "E"];

  const sortedData = data
    ? [...data].sort((a, b) => {
        return order.indexOf(a.question_choice_title) - order.indexOf(b.question_choice_title);
      })
    : [];

  return (
    <div className="mb-4 space-y-4">
      {sortedData.map((choice) => (
        <div key={choice.id} className="border rounded-md p-4 bg-white shadow-sm space-y-3">
          <div className="flex justify-between items-center gap-2 font-semibold">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-sm bg-[#ad0a1f]">
                {choice.question_choice_title}.
              </Badge>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘Bobot: {choice.question_choice_weighted}</span>
            </div>
            <div className="flex items-center gap-2">
              <UpdateQuestionChoiceModal product_try_out_id={choice.product_try_out_id} questionId={choice.question_id} questionChoiceId={choice.id} onSuccess={() => handleRefecthQuestionChoice()} questionCategory={questionCategory} />
              <DeleteQuestionChoiceModal product_try_out_id={choice.product_try_out_id} questionId={choice.question_id} questionChoiceId={choice.id} onDeleted={() => handleRefecthQuestionChoice()} />
            </div>
          </div>

          {/* Teks Pilihan */}
          {choice.question_choice_text.length > 0 && (
            <div className="space-y-1 text-sm">
              {choice.question_choice_text.map((line, idx) => {
                return <p key={idx}>{line}</p>;
              })}
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
              {choice.question_choice_images.map((src, idx) => (
                <Image key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-full rounded border" width={800} height={450} style={{ objectFit: "contain" }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
