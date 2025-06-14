import React from "react";
import Image from "next/image";
import LatexRenderer from "@/components/LatexRendered/LatexRendered";

interface AnswerExplanationForPembahasanProps {
  answerExplanations:
    | {
        answer_explanation_text: string[] | null;
        answer_explanation_text_math: string[] | null;
        answer_explanation_images: string[] | null;
      }
    | null
    | undefined; // Nullable and undefined
}

const AnswerExplanationForPembahasan: React.FC<AnswerExplanationForPembahasanProps> = ({ answerExplanations }) => {
  // Check if answerExplanations is null or undefined
  if (!answerExplanations) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-gray-100 p-6 rounded-md shadow-lg">
        <div className="text-center text-lg text-gray-700 font-semibold">
          <p className="mb-4">📘 Pembahasan Belum Tersedia</p>
          <p className="text-sm text-gray-500">Penjelasan untuk soal ini belum tersedia atau ada kesalahan dalam data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="space-y-6">
        {/* Explanation */}
        <div className="space-y-4 border p-4 rounded-md bg-gray-100 border-gray-300">
          <div className="flex justify-between items-center border-b border-gray-500 pb-2 gap-2 font-semibold">
            <h1 className="text-base font-bold text-gray-800">📘 Pembahasan:</h1>
          </div>

          {/* Teks Penjelasan */}
          {Array.isArray(answerExplanations.answer_explanation_text) && answerExplanations.answer_explanation_text.length > 0 && (
            <div className="space-y-2">
              {answerExplanations.answer_explanation_text.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}

          {/* Math Penjelasan */}
          {Array.isArray(answerExplanations.answer_explanation_text_math) && answerExplanations.answer_explanation_text_math.length > 0 && (
            <div className="space-y-2 text-base sm:text-xl">
              {answerExplanations.answer_explanation_text_math.map((math, i) => (
                <LatexRenderer key={i} latexStrings={[math]} />
              ))}
            </div>
          )}

          {/* Gambar Penjelasan */}
          {Array.isArray(answerExplanations.answer_explanation_images) && answerExplanations.answer_explanation_images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {answerExplanations.answer_explanation_images.map((src, i) => (
                <Image key={i} src={src} alt={`Gambar penjelasan ${i + 1}`} className="w-full lg:w-[60%] rounded" width={800} height={450} style={{ objectFit: "contain" }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerExplanationForPembahasan;
